import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { CERTIFICATIONS, EDUCATION, EXPERIENCES } from "../constants";
import { Badge } from "./ui/badge";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const Experience = ({ showHeading = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section
      aria-labelledby={showHeading ? "experience-heading" : undefined}
      className="space-y-[var(--gap-block)]"
    >
      {showHeading && (
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Roles delivering AI automation and scalable systems."
        />
      )}

      <div ref={timelineRef} className="relative">
        <span className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden="true" />
        <m.span
          style={{ scaleY: prefersReducedMotion ? 1 : lineScale }}
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
          aria-hidden="true"
        />

        <ol className="space-y-12 pl-6 sm:pl-10">
          {EXPERIENCES.map((experience, index) => (
            <li key={`${experience.company}-${experience.role}`} className="relative">
              {/* The ring matches the real page background. The old `ring-black`
                  sat on a #050505 page and gave every dot a dark halo. */}
              <span
                className={`absolute top-2 h-2 w-2 rounded-full ring-4 ring-bg ${
                  experience.current ? "bg-accent" : "bg-white/30"
                } -left-[29px] sm:-left-[45px]`}
                aria-hidden="true"
              />

              <Reveal delay={index * 0.05}>
                <article>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg text-ink">{experience.role}</h3>
                    {experience.current && <Badge variant="accent">Current</Badge>}
                  </div>

                  <p className="mt-1.5 text-sm text-ink-2">
                    {experience.company}
                    <span className="mx-2 text-ink-4" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-mono text-xs text-ink-3">
                      {experience.year}
                    </span>
                  </p>

                  {experience.summary && (
                    <p className="mt-4 max-w-measure text-base leading-relaxed text-ink-2">
                      {experience.summary}
                    </p>
                  )}

                  <ul className="mt-5 space-y-2.5">
                    {experience.points.map((point) => (
                      <li
                        key={point}
                        className="flex max-w-measure items-start gap-3 text-sm leading-relaxed text-ink-3"
                      >
                        <span
                          className="mt-[9px] h-px w-3 shrink-0 bg-accent/60"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {experience.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <Reveal>
        <div className="grid gap-10 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <h3 className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
              Education
            </h3>
            <p className="mt-3 font-display text-base text-ink">{EDUCATION.degree}</p>
            <p className="mt-1 text-sm text-ink-2">{EDUCATION.institution}</p>
            <p className="mt-1 font-mono text-xs text-ink-4">
              {EDUCATION.period} · {EDUCATION.score}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
              Certifications
            </h3>
            <ul className="mt-3 space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name}>
                  <p className="text-sm text-ink">{cert.name}</p>
                  <p className="font-mono text-xs text-ink-4">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Experience;
