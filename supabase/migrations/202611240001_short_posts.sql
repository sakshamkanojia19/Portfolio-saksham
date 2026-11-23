-- Run AFTER 202611230001_portfolio.sql. Existing articles and votes are preserved.
begin;
alter table public.portfolio_posts add column if not exists kind text not null default 'article';
alter table public.portfolio_posts drop constraint if exists portfolio_posts_kind_check;
alter table public.portfolio_posts add constraint portfolio_posts_kind_check check (kind in ('article', 'note'));
alter table public.portfolio_posts drop constraint if exists portfolio_posts_body_check;
alter table public.portfolio_posts add constraint portfolio_posts_body_check check (
  (kind = 'note' and char_length(btrim(body)) between 1 and 5000)
  or (kind = 'article' and char_length(btrim(body)) between 50 and 100000)
);
create or replace function public.preserve_portfolio_kind() returns trigger
language plpgsql set search_path = '' as $$
begin
  if old.published_at is not null and new.kind <> old.kind then
    raise exception 'Published content format is permanent';
  end if;
  return new;
end;
$$;
drop trigger if exists portfolio_post_kind on public.portfolio_posts;
create trigger portfolio_post_kind before update on public.portfolio_posts
for each row execute function public.preserve_portfolio_kind();

create or replace function public.portfolio_feed_votes(target_posts uuid[])
returns table(post_id uuid, vote_count bigint, has_voted boolean)
language sql stable security definer set search_path = '' as $$
  select p.id, count(v.user_id), coalesce(bool_or(v.user_id = (select auth.uid())), false)
  from public.portfolio_posts p left join public.portfolio_votes v on v.post_id = p.id
  where p.status = 'published' and p.id = any(target_posts[1:100])
  group by p.id;
$$;
revoke all on function public.portfolio_feed_votes(uuid[]) from public;
grant execute on function public.portfolio_feed_votes(uuid[]) to anon, authenticated;
notify pgrst, 'reload schema';
commit;
