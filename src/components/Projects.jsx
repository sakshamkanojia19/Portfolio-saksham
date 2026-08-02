import { FiArrowUpRight } from "react-icons/fi";
import { PROJECTS } from "../constants";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ProjectCard = ({ project }) => {
  const { featured } = project;

  return (
    <Card
      className={`flex h-full flex-col gap-5 ${
        featured
          ? "border-orange-300/25 bg-gradient-to-br from-purple-500/10 via-black/60 to-orange-400/10"
          : ""
      }`}
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {featured && <Badge variant="orange">Featured</Badge>}
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            {project.subtitle}
          </span>
        </div>
        <h3
          className={`font-display text-white ${
            featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="text-sm font-medium text-orange-200/90">
          {project.tagline}
        </p>
      </div>

      <ul className="space-y-2.5">
        {project.highlights.map((point) => (
          <li
            key={point}
            className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
          >
            <span
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-400"
              aria-hidden="true"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-1">
        {project.link ? (
          <Button asChild variant={featured ? "gradient" : "outline"} size="sm">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.linkLabel}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        ) : (
          // TODO(saksham): add the repo/demo URL in src/constants/index.js to
          // turn this into a real button.
          <span className="inline-flex items-center rounded-full border border-dashed border-white/15 px-4 py-2 text-xs text-white/40">
            {project.linkLabel} — link coming soon
          </span>
        )}
      </div>
    </Card>
  );
};

const Projects = ({ showHeading = true }) => {
  const [featured, ...rest] = PROJECTS;

  return (
    <section
      aria-labelledby={showHeading ? "projects-heading" : undefined}
      aria-label={showHeading ? undefined : "Projects"}
      className="space-y-8"
    >
      {showHeading && (
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="AI products and systems shipped in production."
          lede="Built end to end — architecture, backend, deployment, and the iteration after launch."
        />
      )}

      <div className="space-y-4">
        <Reveal>
          <ProjectCard project={featured} />
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {rest.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
