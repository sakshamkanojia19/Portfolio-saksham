# Saksham Kanojia — AI Engineering Portfolio

A Next.js portfolio for engineering roles and freelance work, with case studies, an owner-only Markdown publishing desk, public articles, and authenticated upvotes backed by Supabase.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. The public portfolio works without credentials. To enable publishing, copy `.env.example` to `.env.local` and follow [the setup guide](docs/SETUP.md). Never commit private environment files.

## Structure

- `app/`: server-rendered routes, metadata, sitemap, RSS, auth callback, and server actions.
- `components/`: responsive navigation, project illustrations, article renderer, contact form, and publishing editor.
- `lib/content.js`: verified profile, resume content, projects, skills, and experience.
- `supabase/migrations/`: owner-only publishing, public-read policies, rate-limited votes, and image storage policies.
- `tests/`: security-relevant input validation and PostgreSQL authorization checks.

## Checks

```sh
npm test
npm run build
```

Deployment remains on the existing Vercel project. Change its framework from Vite to Next.js and remove old build/output overrides before deploying. See [setup and launch](docs/SETUP.md) and [content provenance](docs/CONTENT-SOURCES.md).
