# Portfolio setup and launch

The public portfolio runs without Supabase. Owner sign-in, publishing, image uploads, reader likes, and email subscriptions become active after the steps below. No credentials or database changes were made during local implementation.

## Local preview

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. For local authentication, set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local`. Use the production URL in Vercel.

If `.env.local` already exists, edit it instead of copying over it. After filling in your values, run `npm run setup:check`. It validates settings without printing values, then performs read-only checks of the article API, anonymous draft visibility, publishing authorization, vote and like totals functions, and that reader emails are not readable. It never runs migrations or sends emails. Passing these smoke checks does not replace testing the owner account and uploads.

## Connect your existing Supabase project

1. In `.env.local`, privately enter `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from Supabase project settings. The legacy anon key also works. Never put a service-role key in a `NEXT_PUBLIC_` variable. This app does not need a service-role key.
2. Keep `ADMIN_EMAIL=sakshamkanojia2002@gmail.com`. This check is server-side; the database allowlist below is the authorization boundary for direct database clients.
3. Review and run `supabase/migrations/202611230001_portfolio.sql` in your project's SQL editor or migration workflow. It creates only `portfolio_*` tables/functions, its own storage bucket, and bucket-specific policies. It is transactional, intended to run once, and does not alter existing app tables.
4. In Authentication > URL Configuration, set Site URL to `https://saksham-kanojia.vercel.app` and add `https://saksham-kanojia.vercel.app/**` to Redirect URLs. Keep the Email provider enabled (it also handles password sign-in).
5. Give the owner account a password. The site uses email + password for the owner, so no sign-in emails are needed.
   - **If the account does not exist yet:** Authentication → Users → **Add user → Create new user**, enter your email and a strong password, and tick **Auto Confirm User**.
   - **If it already exists** (for example, created by an earlier email-link attempt), run this once in the SQL editor with your own strong password, then delete the snippet from the editor's history:

```sql
update auth.users
set encrypted_password = extensions.crypt('REPLACE-WITH-A-STRONG-PASSWORD', extensions.gen_salt('bf')),
    email_confirmed_at = coalesce(email_confirmed_at, now())
where lower(email) = 'sakshamkanojia2002@gmail.com';
```

6. Authorize the owner once in the SQL editor:

```sql
insert into public.portfolio_admins (user_id)
select id from auth.users
where lower(email) = 'sakshamkanojia2002@gmail.com'
  and email_confirmed_at is not null
on conflict do nothing;
```

7. Open `https://saksham-kanojia.vercel.app/login?next=/admin`, sign in with your email and password, and you land on the publishing dashboard. Any other account that signs in gets a 404 at `/admin`.
8. Use a long, unique password and keep your Supabase account protected with two-factor authentication. Supabase applies its own sign-in rate limits.

If your existing project has broader storage policies, review them for interaction with the new bucket. PostgreSQL permissive policies combine with OR. This migration cannot audit existing project policies.

## Short posts and articles

For an existing installation, run **only** the new `supabase/migrations/202611240001_short_posts.sql` migration after the original migration. It preserves existing articles and votes, adds a `kind` field, allows short posts of 1–5,000 characters, and adds a public aggregate vote-count function. Do not rerun the original create-tables migration. For a fresh installation, run both files in filename order.

- `/admin`: owner-only publishing desk. Start with **Short post**, type a thought, optionally add topics, then **Post publicly**. Titles, descriptions, and permanent URLs are generated automatically. Select an existing short post to edit it or use **Save draft** to unpublish it.
- `/posts`: public timeline of short posts with their complete text, dates, likes, and copy-link buttons.
- `/posts/[slug]`: an individual post with its own canonical URL, metadata, social preview, SocialMediaPosting structured data, share links, email subscription, and newer/older navigation.
- `/writing`: longer articles; the article editor is available under **Long-form article** in `/admin`.
- `/subscribe`: email subscription plus a human-readable explanation of RSS with a copyable feed URL.
- `/feed.xml`: machine-readable RSS including both published short posts and articles. Drafts are excluded.

Publishing still requires the owner authorization described above. Apply the migration and deploy the updated application before trying the new composer in production.

## Likes and email subscriptions

Run `supabase/migrations/202611250001_likes_and_subscribers.sql` once in the SQL editor, after the two earlier migrations. It only adds the `portfolio_likes` and `portfolio_subscribers` tables and their functions; existing posts, votes, and accounts are untouched, and it is safe to re-run.

- **Likes:** readers click **Like**, enter a name and email once (remembered in their browser), and the like is saved. No account or email confirmation. One like per email per post; earlier signed-in upvotes are kept and included in the total. Until the migration runs, the button shows "Likes unavailable".
- **Subscribers:** the box on posts, `/posts`, and `/subscribe` stores name + email. This app does **not** send emails yet. View or export the list in Supabase → Table Editor → `portfolio_subscribers`, and send updates with an email service (for example Resend) that includes an unsubscribe link. Remove people who ask to unsubscribe.
- **Privacy:** emails are never readable through the public API (no table grants; writes only via validated functions that return counts). Public pages show only totals. Update the privacy page if you start using the data differently.
- **Abuse limits:** because emails are not verified, someone can add fake likes with made-up addresses. The database limits each email to 20 likes per 10 minutes, each post to 300 new likes per hour, and new subscribers to 200 per hour, and the forms include a hidden bot trap.

## Private dashboard access

No public page links to `/admin`. Type the URL yourself.

- Supabase not configured: `/admin` returns the site's generic 404 page. No setup or configuration details are shown.
- Configured, signed out: `/admin` redirects to `/login?next=/admin`.
- Signed in as any account other than the owner: generic 404.
- Owner (`ADMIN_EMAIL` matches **and** `is_portfolio_admin()` returns true): the publishing dashboard.

Hiding links is not the security boundary. Server actions call `requireAdmin()` before every write or upload, and Supabase RLS enforces the `portfolio_admins` allowlist. `/admin` is excluded from the sitemap and marked `noindex`. It is deliberately not listed in `robots.txt`, because that file is public and would advertise the path.

## Access controls

- Public users can select only published articles. RLS protects drafts even through direct API requests.
- Only UUIDs added to `portfolio_admins` can write posts or upload to `portfolio-images`. The allowlist has no client grants.
- Readers can like only published posts, once per email per post, through a throttled database function. Like and subscriber emails have no API read access; public RPCs return totals only.
- Earlier signed-in upvotes remain in `portfolio_votes` and count toward like totals.
- A published slug cannot be changed, including after unpublishing. Unpublish with “Save as draft”.
- Markdown does not execute raw HTML. Unsafe URL schemes are blocked by the renderer.
- Admin/login pages are marked `noindex`; authorization does not depend on robots.txt. Non-owners and unconfigured deployments get a 404 from `/admin`.
- There are no service-role credentials or development authentication bypasses.

## Vercel deployment

The repository now uses **Next.js**, replacing Vite. In Vercel project settings, remove old Vite overrides: Framework Preset = Next.js, Build Command = `npm run build`, Output Directory = default. Add environment variables in Vercel, with `NEXT_PUBLIC_SITE_URL=https://saksham-kanojia.vercel.app` (or the chosen canonical domain). Redeploy using your existing repository workflow. No new hosting destination is required.

Before public launch, verify:

- Logged-out users cannot access drafts or publish through the Supabase REST API.
- Your owner account can save, preview, publish, update, upload, and unpublish an article.
- A reader can like a post with a name and email; totals survive reloads and the same email cannot like twice.
- A second account that signs in cannot see `/admin` (404) or publish.
- Article text, title, canonical URL, and JSON-LD appear in the initial HTTP HTML.
- `/sitemap.xml`, `/robots.txt`, `/feed.xml`, and `/opengraph-image` respond correctly.

## Search visibility

Verify the domain in Google Search Console and submit `/sitemap.xml`. Request indexing for the homepage and core case studies. Link the canonical site from GitHub and LinkedIn. If moving domains, set permanent redirects on the old host and update the env variable and auth URLs. Existing `/skills`, `/experience`, `/ai-pov`, and `/exploring` paths redirect to their new destinations.

Monitor branded search impressions and qualified work inquiries. Structured data and technical SEO support indexing; they do not guarantee rankings. Publish original posts and link them to relevant case studies.

SEO/AEO/GEO foundations include server-rendered public content, individual post URLs, automatic sitemap and RSS entries, visible authorship, linked Person/WebSite/ProfilePage entities, truthful article/post structured data, and direct answers on the About page. Public content is allowed by the general robots rule; deployment protection or a firewall must not block intended crawlers. There is no guarantee of Google rankings or citation in AI answers. Special "AI SEO" files are not a substitute for useful, original content. See [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Contact and privacy

The inquiry form creates a mailto draft and explicitly requires the visitor to send it in their own email app. There is no inquiry database or email-delivery backend. Theme preference uses local storage; login uses essential cookies. Fonts load from Google Fonts. No analytics or advertising scripts are installed.

## Tests

```powershell
npm test
npm run build
npm run test:browser
```

Real SMTP, Supabase storage, and production authentication must be verified after configuration.

The composer browser test uses an isolated in-memory action stub; it does not publish test content or contact your account. Database permission tests run against disposable local PGlite, not production. End-to-end publishing on your Supabase project still requires your authenticated owner session.
