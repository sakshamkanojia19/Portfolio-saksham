import Image from "next/image";
import { projectPresentation } from "../lib/project-presentation";

export default function ProjectPreview({ project, detailed = false }) {
  const info = projectPresentation[project.slug];
  if (!info) return null;
  return (
    <figure className={`project-preview${detailed ? " project-preview-large" : ""}`}>
      {info.image ? (
        <div className="preview-image">
          <Image
            src={info.image}
            alt={info.alt}
            width={1440}
            height={960}
            sizes={detailed ? "(max-width: 800px) 100vw, 1120px" : "(max-width: 700px) 100vw, 560px"}
          />
        </div>
      ) : (
        <div className="preview-diagram">
          <p className="preview-project">{project.name}</p>
          <p className="preview-focus">{info.focus}</p>
          <ol className="preview-flow" aria-label={`${project.name} processing sequence`}>
            {project.flow.map(step => <li key={step}>{step}</li>)}
          </ol>
          <span className="preview-stack">{project.stack.slice(0, 3).join(" / ")}</span>
        </div>
      )}
      <figcaption>
        <span>{info.image ? "Live website preview" : "System overview"}</span>
        {detailed && info.image && <a href={info.image} target="_blank" rel="noopener noreferrer">View full image</a>}
      </figcaption>
    </figure>
  );
}
