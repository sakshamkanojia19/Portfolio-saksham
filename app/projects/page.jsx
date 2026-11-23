import { projects } from "../../lib/content";
import { metadata as pageMeta } from "../../lib/site";
import ProjectCard from "../../components/ProjectCard";
export const metadata = pageMeta(
  "Projects",
  "Explore AI engineering case studies: real-time voice with Nexus, permission-aware RAG with CollabDocs, and agentic workflows.",
  "/projects",
);
export default function Projects() {
  return (
    <div className="container">
      <div className="page-heading">
        <span className="eyebrow">SELECTED ENGINEERING</span>
        <h1>Ideas, made useful.</h1>
        <p>
          The systems I’ve built, the problems behind them,
          <br />
          and the decisions that shaped the result.
        </p>
      </div>
      <div className="project-grid all-projects">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
