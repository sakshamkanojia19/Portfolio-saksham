import Link from "next/link";
import ProjectArt from "./ProjectArt";
export default function ProjectCard({ project: p }) {
  return (
    <article className="project-card">
      <Link
        className="art-link"
        href={`/projects/${p.slug}`}
        aria-label={`Read the ${p.name} case study`}
      >
        <ProjectArt kind={p.slug} compact />
      </Link>
      <div className="project-card-body">
        <span className="eyebrow">{p.category}</span>
        <h3>
          <Link href={`/projects/${p.slug}`}>{p.name}</Link>
        </h3>
        <p>{p.summary}</p>
        <div className="tags">
          {p.stack.slice(0, 4).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <Link className="text-link" href={`/projects/${p.slug}`}>
          Explore the case study
        </Link>
      </div>
    </article>
  );
}
