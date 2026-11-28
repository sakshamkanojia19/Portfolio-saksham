import Link from "next/link";
import ProjectPreview from "./ProjectPreview";

// Consistent project previews; the full evidence lives on the case-study page.
export default function ProjectCard({ project: p }) {
  const href = `/projects/${p.slug}`;
  return (
    <article className="project" data-reveal>
      <ProjectPreview project={p} />
      <div className="project-body">
      <div className="project-top">
        <span className="kicker">{p.category}</span>
      </div>
      <h3>
        <Link href={href}>{p.name}</Link>
      </h3>
      <p className="project-tagline">{p.title}</p>
      <ul className="project-results" aria-label="Selected results">
        {p.metrics.slice(0, 1).map(([value, label]) => (
          <li key={label}>
            <b>{value}</b> {label}
          </li>
        ))}
      </ul>
      <div className="project-links">
        <Link className="text-link" href={href}>
          Read case study
        </Link>
        {p.repository && (
          <a href={p.repository} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {p.link && (
          <a href={p.link} target="_blank" rel="noopener noreferrer">
            Live demo
          </a>
        )}
      </div>
      </div>
    </article>
  );
}
