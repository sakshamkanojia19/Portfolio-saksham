import { FiArrowUpRight } from "react-icons/fi";
import { PROJECTS } from "../constants";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SpotlightCard } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const MetricGrid = ({ metrics }) => (
  <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
    {metrics.map((metric) => (
      <div key={metric.label} className="bg-surface px-3.5 py-3">
        <dd className="font-display text-base font-semibold text-accent">
          {metric.value}
        </dd>
        <dt className="mt-0.5 font-mono text-2xs uppercase tracking-[0.1em] text-ink-4">
          {metric.label}
        </dt>
      </div>
    ))}
  </dl>
);

const ProjectLink = ({ project, variant }) =>
  project.link ? (
    <Button asChild variant={variant === "full" ? "primary" : "subtle"} size="sm">
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        {project.linkLabel}
        <FiArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  ) : (
    // Honest empty state. The old build rendered a dashed grey pill reading
    // "link coming soon", which looked like a disabled button on a live site.
    // TODO(saksham): set `link` in src/constants/index.js to replace this.
    <p className="font-mono text-2xs text-ink-4">
      Private build — walkthrough available on request
    </p>
  );

/**
 * Case-study card.
 *
 * `variant="full"` (the /projects page) shows the problem/approach narrative;
 * `variant="compact"` (anywhere teasing the work) shows the outcome only. The
 * grid-level `h-full` plus the footer's `mt-auto` keeps every card in a row
 * the same height — the old two-up row had visibly ragged bottoms because the
 * projects have different bullet counts.
 */
const ProjectCard = ({ project, index, variant = "compact" }) => {
  const isFull = variant === "full";

  return (
    <SpotlightCard as="article" className="h-full p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
            {project.subtitle}
          </p>
          <h3 className={`mt-2 font-display text-ink ${isFull ? "text-xl" : "text-lg"}`}>
            {project.title}
          </h3>
        </div>
        <span
          aria-hidden="true"
          className="index-num shrink-0 text-xl font-semibold"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-3 text-sm font-medium text-ink-2">{project.tagline}</p>

      <p className="mt-3 font-mono text-2xs text-ink-4">
        {project.year} · {project.role}
      </p>

      {isFull && (
        <div className="mt-6 space-y-5 border-t border-line pt-5">
          <div>
            <h4 className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
              The problem
            </h4>
            <p className="mt-2 max-w-measure text-sm leading-relaxed text-ink-2">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
              The approach
            </h4>
            <p className="mt-2 max-w-measure text-sm leading-relaxed text-ink-2">
              {project.approach}
            </p>
          </div>
        </div>
      )}

      {project.metrics?.length > 0 && (
        <div className="mt-6">
          <MetricGrid metrics={project.metrics} />
        </div>
      )}

      {isFull && (
        <ul className="mt-6 space-y-2.5">
          {project.highlights.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm leading-relaxed text-ink-2"
            >
              <span
                className="mt-[9px] h-px w-3 shrink-0 bg-accent/70"
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-3 pt-6">
        <ProjectLink project={project} variant={variant} />
      </div>
    </SpotlightCard>
  );
};

const Projects = ({ showHeading = true, variant = "compact" }) => (
    <section
      aria-labelledby={showHeading ? "projects-heading" : undefined}
      className="space-y-[var(--gap-block)]"
    >
      {showHeading && (
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="AI products and systems shipped in production."
          lede="Built end to end — architecture, backend, deployment, and the iteration after launch."
        />
      )}

      <div
        className={
          variant === "full"
            ? "space-y-5"
            : "grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        }
      >
        {PROJECTS.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.06} className="h-full">
            <ProjectCard project={project} index={index} variant={variant} />
          </Reveal>
        ))}
      </div>
    </section>
);

export default Projects;
