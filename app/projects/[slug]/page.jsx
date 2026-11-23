import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../lib/content";
import { metadata as pageMeta, jsonLd, siteUrl } from "../../../lib/site";
import ProjectArt from "../../../components/ProjectArt";
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
export default async function Project({ params }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <div className="container">
      <div className="page-heading project-heading">
        <Link className="back-link" href="/projects">
          All projects
        </Link>
        <span className="eyebrow">{p.category}</span>
        <h1>
          {p.name}
          <span className="accent">.</span>
        </h1>
        <p className="project-subtitle">{p.title}</p>
        <div className="tags">
          {p.stack.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="hero-actions">
          {p.link && (
            <a
              className="button secondary"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live project
            </a>
          )}
          {p.repository && (
            <a
              className="button secondary"
              href={p.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore source on GitHub
            </a>
          )}
        </div>
      </div>
      <ProjectArt kind={p.slug} />
      <div className="project-metrics">
        {p.metrics.map(([v, l]) => (
          <div key={l}>
            <strong>{v}</strong>
            <span>{l}</span>
          </div>
        ))}
      </div>
      {p.caveat && <p className="caption">{p.caveat}</p>}
      <div className="case-layout">
        <aside>
          <span className="eyebrow">SYSTEM FLOW</span>
          <ol className="flow-list">
            {p.flow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Link className="text-link" href="/work-with-me">
            Have a similar challenge?
          </Link>
        </aside>
        <article className="prose">
          <h2>The problem</h2>
          <p>{p.problem}</p>
          {p.sections.map(([title, body]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
          <hr />
          <h2>Let’s talk about your system.</h2>
          <p>
            If you’re building in this space, I’m open to engineering roles and
            focused projects.
          </p>
          <Link href="/work-with-me">Work with me</Link>
        </article>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.name,
            description: p.summary,
            url: `${siteUrl}/projects/${p.slug}`,
            author: { "@id": `${siteUrl}/#person` },
          }),
        }}
      />
    </div>
  );
}
