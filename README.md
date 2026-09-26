# Saksham Kanojia — Portfolio

AI Automation Engineer portfolio. React + Vite + Tailwind, deployed on Vercel.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the built output
npm run lint
```

## Content

**All copy lives in [`src/constants/index.js`](src/constants/index.js).** Components read
from it and nothing else, so updating the site after a resume change means editing that one
file. It is also the source for the nav, the footer links and the sitemap.

Items still needing a real value are marked `TODO(saksham)`. Each one degrades gracefully
rather than rendering a placeholder:

| What | Where | Until then |
| --- | --- | --- |
| Repo/demo URL for the Lead Intelligence Agent | `PROJECTS[1].link` | Card shows "Private build — walkthrough available on request" instead of a dead button |
| Direct URL for the "Permissions before generation" post | `WRITING.posts[0].href` + drop `pending: true` | Card is labelled as opening the LinkedIn profile, not as a published post |

## Design system

Tokens are defined once as CSS custom properties in [`src/index.css`](src/index.css) and
surfaced to Tailwind through [`tailwind.config.js`](tailwind.config.js). Nothing hard-codes a
colour.

- **Monochrome ink scale + a single amber accent** (`--accent: #ff8a3d`). The accent marks
  exactly one primary action per view; everything else is greyscale. Errors are red
  (`--danger`), never the accent, and the focus ring is white so keyboard focus can never be
  mistaken for hover.
- **Every ink step passes WCAG AA for small text.** The ratios in the token block are
  measured against `--bg` in the rendered page, not estimated — `--ink-4` is used for real
  label text, so lowering it starts failing contrast.
- **Fluid type** (`--fs-*`, all `clamp()`) so nothing jumps at a breakpoint.
- **One motion system**: shared easing and duration exported from
  [`Reveal.jsx`](src/components/Reveal.jsx). Reveals fire once and small screens get a
  cheaper variant rather than being opted out of animation entirely.

## Routes

Eight routes, each with content of its own — the home page summarises and links out rather
than rendering every section in full:

`/` · `/about` · `/ai-pov` · `/skills` · `/projects` · `/experience` · `/exploring` ·
`/contact`, plus a real 404.

Per-route `<title>`, description and **canonical URL** are set by
[`useDocumentMeta`](src/hooks/useDocumentMeta.js).

## Notable bits

- **⌘K command palette** ([`CommandPalette.jsx`](src/components/CommandPalette.jsx)) —
  jump to any page, open the resume, or copy the email address. `/` also opens it.
- **Permission-aware RAG trace** ([`TraceTerminal.jsx`](src/components/TraceTerminal.jsx)) —
  the flagship AI principle demonstrated rather than described.
- `public/og.png` is a real 1200×630 share card. Regenerate it if the headline or the
  proof numbers change.

## Deployment

[`vercel.json`](vercel.json) rewrites all paths to `index.html` so the client-side routes
survive a refresh or a direct link, and fingerprinted assets are served immutable.
