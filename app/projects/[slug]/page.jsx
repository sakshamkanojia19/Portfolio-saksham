import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../lib/content";
import { projectPresentation } from "../../../lib/project-presentation";
import ProjectPreview from "../../../components/ProjectPreview";
import { metadata as pageMeta, jsonLd, siteUrl } from "../../../lib/site";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? pageMeta(
        `${p.name} — AI engineering case study`,
        p.summary,
        `/projects/${slug}`,
      )
    : {};
}
// A plain case study: what it is, the result, then the write-up as text.
export default async function Project({ params }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const overview = projectPresentation[p.slug];
  const next = projects[(i + 1) % projects.length];
  return (
    <div className="container case">
      <header className="page-heading">
        <Link className="back-link" href="/projects">
          All projects
        </Link>
        <span className="eyebrow">{p.category}</span>
        <h1>{p.name}</h1>
        <p className="project-subtitle">{p.title}</p>
        <p>{p.summary}</p>
        <ul className="chips chips-metric" aria-label="Results">
          {p.metrics.map(([v, l]) => (
            <li key={l}>
              <b>{v}</b> {l}
            </li>
          ))}
        </ul>
        {p.caveat && <p className="caption">{p.caveat}</p>}
        <div className="hero-actions">
          {p.repository && (
            <a
              className="button primary"
              href={p.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub ↗
            </a>
          )}
          {p.link && (
            <a
              className="button"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live project ↗
            </a>
          )}
        </div>
      </header>
      <ProjectPreview project={p} detailed />
      <section className="case-overview" aria-labelledby="overview-heading">
        <div>
          <p className="sec-label">At a glance</p>
          <h2 id="overview-heading">The engineering behind it.</h2>
        </div>
        <dl>
          <div><dt>My contribution</dt><dd>{overview.contribution}</dd></div>
          <div><dt>Key decision</dt><dd>{overview.decision}</dd></div>
          <div><dt>Results &amp; evidence</dt><dd>{overview.evidence}</dd></div>
        </dl>
      </section>
      <section className="case-architecture" aria-labelledby="architecture-heading">
        <h2 id="architecture-heading">How it fits together</h2>
        <ol>{p.flow.map(step => <li key={step}>{step}</li>)}</ol>
      </section>
      <article className="prose">
        <h2>The problem</h2>
        <p>{p.problem}</p>
        {p.sections.map(([title, body]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}
        <p className="stack-line">Built with {p.stack.join(", ")}.</p>
      </article>
      <footer className="case-footer">
        <Link href="/work-with-me">Building something similar? Let’s talk →</Link>
        <Link href={`/projects/${next.slug}`}>Next: {next.name} →</Link>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": `${siteUrl}/projects/${p.slug}#work`,
            name: p.name,
            headline: p.title,
            description: p.summary,
            url: `${siteUrl}/projects/${p.slug}`,
            keywords: p.stack.join(", "),
            author: { "@id": `${siteUrl}/#person` },
            ...(p.repository && { sameAs: p.repository }),
            isPartOf: { "@id": `${siteUrl}/#website` },
          }),
        }}
      />
    </div>
  );
}
