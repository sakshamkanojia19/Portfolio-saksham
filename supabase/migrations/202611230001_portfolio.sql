-- Additive migration: namespaced tables avoid touching existing application data.
begin;
create table public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.portfolio_admins enable row level security;
revoke all on public.portfolio_admins from anon, authenticated;

create function public.is_portfolio_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.portfolio_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to anon, authenticated;

create table public.portfolio_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id),
  title text not null check (char_length(title) between 5 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 100),
  excerpt text not null check (char_length(excerpt) between 20 and 300),
  body text not null check (char_length(body) between 50 and 100000),
  tags text[] not null default '{}' check (cardinality(tags) <= 5),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index portfolio_posts_publication on public.portfolio_posts(status, published_at desc);
alter table public.portfolio_posts enable row level security;
revoke all on public.portfolio_posts from anon, authenticated;
grant select on public.portfolio_posts to anon, authenticated;
grant insert, update, delete on public.portfolio_posts to authenticated;
create policy "Public reads published articles" on public.portfolio_posts for select to anon, authenticated using (status = 'published');
create policy "Owner manages articles" on public.portfolio_posts for all to authenticated using ((select public.is_portfolio_admin())) with check ((select public.is_portfolio_admin()) and author_id = (select auth.uid()));

create function public.prepare_portfolio_post() returns trigger
language plpgsql set search_path = '' as $$
begin
  if TG_OP = 'UPDATE' then
    if old.published_at is not null and new.slug <> old.slug then
      raise exception 'Published article slugs are permanent';
    end if;
    new.created_at := old.created_at;
    new.published_at := old.published_at;
    new.author_id := old.author_id;
  else
    new.created_at := now();
    new.published_at := null;
  end if;
  if new.status = 'published' and new.published_at is null then new.published_at := now(); end if;
  new.updated_at := now();
  return new;
end;
$$;
create trigger portfolio_post_dates before insert or update on public.portfolio_posts for each row execute function public.prepare_portfolio_post();

create table public.portfolio_votes (
  post_id uuid not null references public.portfolio_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(post_id, user_id)
);
create table public.portfolio_vote_limits (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_action timestamptz not null
);
alter table public.portfolio_votes enable row level security;
alter table public.portfolio_vote_limits enable row level security;
-- Mutations go through the rate-limited function. No direct API writes.
revoke all on public.portfolio_votes, public.portfolio_vote_limits from anon, authenticated;

create function public.portfolio_vote_stats(target_post uuid)
returns table(vote_count bigint, has_voted boolean)
language sql stable security definer set search_path = '' as $$
  select count(v.user_id), coalesce(bool_or(v.user_id = (select auth.uid())), false)
  from public.portfolio_posts p left join public.portfolio_votes v on v.post_id = p.id
  where p.id = target_post and p.status = 'published'
  group by p.id;
$$;
revoke all on function public.portfolio_vote_stats(uuid) from public;
grant execute on function public.portfolio_vote_stats(uuid) to anon, authenticated;

create function public.set_portfolio_vote(target_post uuid, desired boolean) returns bigint
language plpgsql security definer set search_path = '' as $$
declare actor uuid := auth.uid(); previous_action timestamptz; result bigint;
begin
  if actor is null or desired is null then raise exception 'Sign in to vote'; end if;
  -- Serialize requests per user, including the first request and concurrent tabs.
  perform pg_advisory_xact_lock(hashtextextended(actor::text, 0));
  if not exists(select 1 from public.portfolio_posts where id = target_post and status = 'published') then
    raise exception 'Article is not published';
  end if;
  select last_action into previous_action from public.portfolio_vote_limits where user_id = actor;
  if previous_action > clock_timestamp() - interval '3 seconds' then raise exception 'Please wait before voting again'; end if;
  insert into public.portfolio_vote_limits(user_id, last_action) values(actor, clock_timestamp())
    on conflict(user_id) do update set last_action = excluded.last_action;
  if desired then
    insert into public.portfolio_votes(post_id,user_id) values(target_post,actor) on conflict do nothing;
  else
    delete from public.portfolio_votes where post_id = target_post and user_id = actor;
  end if;
  select count(*) into result from public.portfolio_votes where post_id = target_post;
  return result;
end;
$$;
revoke all on function public.set_portfolio_vote(uuid,boolean) from public;
grant execute on function public.set_portfolio_vote(uuid,boolean) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('portfolio-images','portfolio-images',true,4194304,array['image/jpeg','image/png','image/webp','image/gif']);
create policy "Portfolio owner uploads images" on storage.objects for insert to authenticated
with check (bucket_id = 'portfolio-images' and (select public.is_portfolio_admin()) and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Portfolio owner removes images" on storage.objects for delete to authenticated
using (bucket_id = 'portfolio-images' and (select public.is_portfolio_admin()) and (storage.foldername(name))[1] = (select auth.uid())::text);
commit;
