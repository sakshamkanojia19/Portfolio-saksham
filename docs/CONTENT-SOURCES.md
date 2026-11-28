# Content sources and editorial decisions

Primary source: `Saksham-Kanojia-AI-Eng-77.docx`, as identified by the owner. Cross-checked against `Saksham-Kanojia-Resume-AI-Engineer-77.docx` and `Saksham-Kanojia-Resume-AI-Engineer-27.pdf`.

- Profile, two work roles, skills, four projects, education, and certifications come from the resumes.
- The older PDF adds compatible CollabDocs details: consolidation from eight services to a modular monolith, 37 unit tests, and live database smoke tests. It also adds context about Nexus's continuous microphone session and retrieval debugging.
- The enterprise voice module remains described as **building**, not shipped.
- Operations reduction stays **estimated ~60%, directional and leadership-validated**.
- Nexus latency keeps its 4 GB laptop GPU context. Its 17 test count is a resume claim about Nexus, not this portfolio.
- Medical chatbot relevance/latency metrics are project-reported; no additional conversion metric was carried over from the old site.
- The old site's IBM internship was not in any supplied resume and has not been retained as verified content.
- Nexus, CollabDocs, and Lead Intelligence repository links were verified against the public GitHub repository listing for `sakshamkanojia19` during implementation.
- Nexus and Lead Intelligence illustrations are labeled system overviews, not screenshots of applications.
- On 2026-11-27, public landing-page screenshots were captured from https://collabdocs-v1.vercel.app/ and https://chatbot-3-frontend.vercel.app/ without signing in or submitting data. These are stored in `public/projects/` and labelled "Live website preview". The CollabDocs landing page includes its own example workspace; the screenshot is not evidence of a signed-in workspace session.
- `lib/project-presentation.js` summarizes contributions, decisions, and evidence already described in the case-study content; it adds no new performance claims.
- No testimonials, client logos, article dates, vote counts, or completed articles were invented.
- Starter writing outlines exist only in the authorized admin interface and are never automatically published.
- `/resume.docx` is an exact copy of the user-designated latest resume, including its contact details.

Edit portfolio content in `lib/content.js`. Published articles live in Supabase.
