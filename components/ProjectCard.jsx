import Link from "next/link";
import ProjectArt from "./ProjectArt";

// Featured case-study row: artwork on one side, story + proof on the other.
export default function ProjectCard({ project: p, index = 0 }) {
  const href = `/projects/${p.slug}`;
  return (
    <article
      className={`work-row spotlight tone-${p.color}`}
      data-reveal
    >
      <Link
        className="work-art"
        href={href}
        aria-label={`Read the ${p.name} case study`}
        tabIndex={-1}
      >
        <ProjectArt kind={p.slug} compact />
        <span className="work-number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Link>
      <div className="work-body">
        <span className="work-category">{p.category}</span>
        <h3>
          <Link href={href}>{p.name}</Link>
        </h3>
        <p className="work-tagline">{p.title}</p>
        <p className="work-summary">{p.summary}</p>
        <dl className="work-metrics">
          {p.metrics.map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {p.caveat && <p className="work-caveat">{p.caveat}</p>}
        <div className="chip-row">
          {p.stack.slice(0, 6).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="work-links">
          <Link className="button primary small" href={href}>
            Read the case study <span className="btn-arrow">→</span>
          </Link>
          {p.repository && (
            <a
              className="text-link"
              href={p.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source ↗
            </a>
          )}
          {p.link && (
            <a
              className="text-link"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
