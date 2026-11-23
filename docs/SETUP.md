# Portfolio setup and launch

The public portfolio runs without Supabase. Publishing, image uploads, email sign-in, and shared upvotes become active after the steps below. No credentials or database changes were made during local implementation.

## Local preview

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. For local authentication, set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local`. Use the production URL in Vercel.

If `.env.local` already exists, edit it instead of copying over it. After filling in your values, run `npm run setup:check`. It validates settings without printing values, then performs read-only checks of the article API, anonymous draft visibility, publishing authorization, and vote totals function. It never runs migrations or sends sign-in emails. Passing these smoke checks does not replace testing owner/reader accounts, SMTP, and uploads.

## Connect your existing Supabase project

1. In `.env.local`, privately enter `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from Supabase project settings. The legacy anon key also works. Never put a service-role key in a `NEXT_PUBLIC_` variable. This app does not need a service-role key.
2. Keep `ADMIN_EMAIL=sakshamkanojia2002@gmail.com`. This check is server-side; the database allowlist below is the authorization boundary for direct database clients.
3. Review and run `supabase/migrations/202611230001_portfolio.sql` in your project's SQL editor or migration workflow. It creates only `portfolio_*` tables/functions, its own storage bucket, and bucket-specific policies. It is transactional, intended to run once, and does not alter existing app tables.
4. In Authentication > URL Configuration, add `http://localhost:3000/auth/callback` and `https://saksham-kanojia.vercel.app/auth/callback` to allowed redirect URLs. Add the new domain callback if you change domains. Set the production Site URL accordingly. Keep Email authentication enabled. The default magic-link email template supports the PKCE flow used here; custom templates must preserve the confirmation URL.
5. Open `/login?next=/admin` and sign in with your publishing email. Open the link in the same browser so the PKCE verifier cookie is available. A regular signed-in visitor has no publishing rights.
6. After that verified sign-in, authorize the owner once in the SQL editor:

```sql
insert into public.portfolio_admins (user_id)
select id from auth.users
where lower(email) = 'sakshamkanojia2002@gmail.com'
  and email_confirmed_at is not null
on conflict do nothing;
```

7. Revisit `/admin`. Create an article or select a starter outline. Add your actual writing before publishing. Uploaded images are public even when attached to draft articles. Draft text is private.
8. Configure production SMTP in Supabase before opening sign-in to the public. The built-in email service has delivery restrictions and rate limits. Configure Auth rate limits as traffic grows.

If your existing project has broader storage policies, review them for interaction with the new bucket. PostgreSQL permissive policies combine with OR. This migration cannot audit existing project policies.

## Short posts and articles

For an existing installation, run **only** the new `supabase/migrations/202611240001_short_posts.sql` migration after the original migration. It preserves existing articles and votes, adds a `kind` field, allows short posts of 1–5,000 characters, and adds a public aggregate vote-count function. Do not rerun the original create-tables migration. For a fresh installation, run both files in filename order.

- `/admin`: owner-only publishing desk. Start with **Short post**, type a thought, optionally add topics, then **Post publicly**. Titles, descriptions, and permanent URLs are generated automatically. Select an existing short post to edit it or use **Save draft** to unpublish it.
- `/posts`: public timeline of short posts with their complete text, dates, share links, and signed-in upvotes.
- `/posts/[slug]`: an individual post with its own canonical URL, metadata, social preview, and SocialMediaPosting structured data.
- `/writing`: longer articles; the article editor is available under **Long-form article** in `/admin`.
- `/subscribe`: a human-readable explanation of RSS with a copyable feed URL. This is not an email newsletter.
- `/feed.xml`: machine-readable RSS including both published short posts and articles. Drafts are excluded.

Publishing still requires the owner authorization described above. The public "Author sign-in" link does not grant visitors access. Apply the migration and deploy the updated application before trying the new composer in production.

## Access controls

- Public users can select only published articles. RLS protects drafts even through direct API requests.
- Only UUIDs added to `portfolio_admins` can write posts or upload to `portfolio-images`. The allowlist has no client grants.
- A signed-in reader can vote only on published articles, with one vote per user per post. A transactional lock and a three-second per-account limit cover concurrent requests. This does not prevent multiple-account abuse.
- Voter identities are not exposed. Public RPCs return totals and whether the current account voted.
- A published slug cannot be changed, including after unpublishing. Unpublish with “Save as draft”.
- Markdown does not execute raw HTML. Unsafe URL schemes are blocked by the renderer.
- Admin/login pages are marked `noindex`; authorization does not depend on robots.txt.
- There are no service-role credentials or development authentication bypasses.

## Vercel deployment

The repository now uses **Next.js**, replacing Vite. In Vercel project settings, remove old Vite overrides: Framework Preset = Next.js, Build Command = `npm run build`, Output Directory = default. Add environment variables in Vercel, with `NEXT_PUBLIC_SITE_URL=https://saksham-kanojia.vercel.app` (or the chosen canonical domain). Redeploy using your existing repository workflow. No new hosting destination is required.

Before public launch, verify:

- Logged-out users cannot access drafts or publish through the Supabase REST API.
- Your owner account can save, preview, publish, update, upload, and unpublish an article.
- A second account can vote but cannot publish; totals survive reloads and duplicate votes do not increase them.
- Email sign-in works with SMTP and the production callback URL.
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
