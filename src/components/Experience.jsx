import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { CERTIFICATIONS, EDUCATION, EXPERIENCES } from "../constants";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const Experience = ({ showHeading = true }) => {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef(null);

  // The gradient line draws itself downward as the timeline scrolls through
  // the viewport — the "current position" follows the reader.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section
      aria-labelledby={showHeading ? "experience-heading" : undefined}
      aria-label={showHeading ? undefined : "Experience"}
      className="space-y-8"
    >
      {showHeading && (
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          accent="purple"
          title="Roles delivering AI automation and scalable systems."
        />
      )}

      <div ref={timelineRef} className="relative">
        <span
          className="absolute bottom-0 left-0 top-0 w-px bg-white/10"
          aria-hidden="true"
        />
        <motion.span
          style={{ scaleY: prefersReducedMotion ? 1 : lineScale }}
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-purple-400 via-fuchsia-400 to-orange-400"
          aria-hidden="true"
        />

        <ol className="space-y-5 pl-5 sm:pl-8">
        {EXPERIENCES.map((experience, index) => (
          <li key={`${experience.company}-${experience.role}`} className="relative">
            <motion.span
              initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 0.35, ease: "backOut" }}
              className={`absolute -left-[25px] top-6 h-2.5 w-2.5 rounded-full ring-4 ring-black sm:-left-[37px] ${
                experience.current
                  ? "bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.8)]"
                  : "bg-purple-400"
              }`}
              aria-hidden="true"
            />
            <Reveal delay={index * 0.06}>
              <Card className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="font-display text-lg text-white sm:text-xl">
                      {experience.role}
                    </h3>
                    <p className="text-sm text-white/55">{experience.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {experience.current && (
                      <Badge variant="orange">Current</Badge>
                    )}
                    <span className="text-xs text-white/45 sm:text-sm">
                      {experience.year}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {experience.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-400"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </li>
        ))}
        </ol>
      </div>

      <Reveal>
        <Card className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-purple-300">
              Education
            </p>
            <h3 className="font-display text-base text-white sm:text-lg">
              {EDUCATION.degree}
            </h3>
            <p className="text-sm text-white/65">{EDUCATION.institution}</p>
            <p className="text-xs text-white/45">
              {EDUCATION.period} · {EDUCATION.score}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-orange-300">
              Certifications
            </p>
            <ul className="space-y-2">
              {CERTIFICATIONS.map((cert) => (
                <li
                  key={cert}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-400"
                    aria-hidden="true"
                  />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Reveal>
    </section>
  );
};

export default Experience;
