-- Run AFTER 202611230001_portfolio.sql and 202611240001_short_posts.sql.
-- Additive and safe to re-run. Existing posts, votes, and accounts are untouched.
--
-- Readers like posts and subscribe with a name + email (no account, no
-- confirmation). Emails are private: anon/authenticated have no table grants,
-- writes go only through the validated, throttled functions below, and the
-- public can read only aggregate like counts.
begin;

create table if not exists public.portfolio_likes (
  post_id uuid not null references public.portfolio_posts(id) on delete cascade,
  email text not null check (
    email = lower(email) and char_length(email) <= 254
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  name text not null check (char_length(name) between 1 and 80),
  created_at timestamptz not null default now(),
  primary key (post_id, email)
);
create index if not exists portfolio_likes_by_email on public.portfolio_likes(email, created_at desc);
create index if not exists portfolio_likes_recent on public.portfolio_likes(post_id, created_at desc);

create table if not exists public.portfolio_subscribers (
  email text primary key check (
    email = lower(email) and char_length(email) <= 254
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  name text not null check (char_length(name) between 1 and 80),
  source text check (char_length(source) <= 200),
  created_at timestamptz not null default now()
);
create index if not exists portfolio_subscribers_recent on public.portfolio_subscribers(created_at desc);

alter table public.portfolio_likes enable row level security;
alter table public.portfolio_subscribers enable row level security;
-- No direct API access. Supabase grants new tables to anon/authenticated by default.
revoke all on public.portfolio_likes, public.portfolio_subscribers from anon, authenticated;

-- Public totals per published post. Includes earlier signed-in upvotes so none are lost.
create or replace function public.portfolio_like_counts(target_posts uuid[])
returns table(post_id uuid, like_count bigint)
language sql stable security definer set search_path = '' as $$
  select p.id,
    (select count(*) from public.portfolio_likes l where l.post_id = p.id)
    + (select count(*) from public.portfolio_votes v where v.post_id = p.id)
  from public.portfolio_posts p
  where p.status = 'published' and p.id = any(target_posts[1:100]);
$$;
revoke all on function public.portfolio_like_counts(uuid[]) from public;
grant execute on function public.portfolio_like_counts(uuid[]) to anon, authenticated;

-- One like per email per post. Errors use SQLSTATE PT400/PT404/PT429 so the
-- API returns matching HTTP statuses and the app can show a clear message.
create or replace function public.add_portfolio_like(target_post uuid, reader_name text, reader_email text)
returns bigint
language plpgsql security definer set search_path = '' as $$
declare
  clean_name text := btrim(coalesce(reader_name, ''));
  clean_email text := lower(btrim(coalesce(reader_email, '')));
  result bigint;
begin
  if char_length(clean_name) not between 1 and 80 then
    raise exception 'Enter your name (up to 80 characters)' using errcode = 'PT400';
  end if;
  if char_length(clean_email) > 254 or clean_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'Enter a valid email address' using errcode = 'PT400';
  end if;
  -- Serialize per post so the throttle counts are accurate under concurrency.
  perform pg_advisory_xact_lock(hashtextextended('portfolio-like:' || coalesce(target_post::text, ''), 0));
  if not exists(select 1 from public.portfolio_posts where id = target_post and status = 'published') then
    raise exception 'Post is not published' using errcode = 'PT404';
  end if;
  -- Throttles limit floods; unverified emails cannot fully prevent fake likes.
  if (select count(*) from public.portfolio_likes
      where email = clean_email and created_at > now() - interval '10 minutes') >= 20 then
    raise exception 'Too many likes. Please try again later.' using errcode = 'PT429';
  end if;
  if (select count(*) from public.portfolio_likes
      where post_id = target_post and created_at > now() - interval '1 hour') >= 300 then
    raise exception 'Too many likes. Please try again later.' using errcode = 'PT429';
  end if;
  insert into public.portfolio_likes(post_id, email, name)
  values (target_post, clean_email, clean_name)
  on conflict (post_id, email) do nothing;
  select c.like_count into result from public.portfolio_like_counts(array[target_post]) c;
  return result;
end;
$$;
revoke all on function public.add_portfolio_like(uuid, text, text) from public;
grant execute on function public.add_portfolio_like(uuid, text, text) to anon, authenticated;

-- Returns nothing either way, so the API never reveals whether an email is
-- already subscribed. Existing subscribers are left unchanged.
create or replace function public.add_portfolio_subscriber(reader_name text, reader_email text, signup_source text default null)
returns void
language plpgsql security definer set search_path = '' as $$
declare
  clean_name text := btrim(coalesce(reader_name, ''));
  clean_email text := lower(btrim(coalesce(reader_email, '')));
begin
  if char_length(clean_name) not between 1 and 80 then
    raise exception 'Enter your name (up to 80 characters)' using errcode = 'PT400';
  end if;
  if char_length(clean_email) > 254 or clean_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'Enter a valid email address' using errcode = 'PT400';
  end if;
  perform pg_advisory_xact_lock(hashtextextended('portfolio-subscribers', 0));
  if (select count(*) from public.portfolio_subscribers
      where created_at > now() - interval '1 hour') >= 200 then
    raise exception 'Too many sign-ups right now. Please try again later.' using errcode = 'PT429';
  end if;
  insert into public.portfolio_subscribers(email, name, source)
  values (clean_email, clean_name, left(signup_source, 200))
  on conflict (email) do nothing;
end;
$$;
revoke all on function public.add_portfolio_subscriber(text, text, text) from public;
grant execute on function public.add_portfolio_subscriber(text, text, text) to anon, authenticated;

notify pgrst, 'reload schema';
commit;
