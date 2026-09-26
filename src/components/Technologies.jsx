import { SKILL_GROUPS } from "../constants";
import { Badge } from "./ui/badge";
import { SpotlightCard } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * The stack, with the context a logo wall can't carry. Each group states what
 * it is actually used for in production — that `usedFor` line is the whole
 * reason the /skills route exists as its own page rather than a chip grid.
 */
const Technologies = ({ showHeading = false, detailed = true }) => (
  <section
    aria-labelledby={showHeading ? "skills-heading" : undefined}
    className="space-y-[var(--gap-block)]"
  >
    {showHeading && (
      <SectionHeading
        id="skills-heading"
        eyebrow="Skills"
        title="The stack I use to ship AI products."
        lede="Grouped the way I actually work — AI systems first, then the infrastructure that keeps them reliable."
      />
    )}

    <div className="grid gap-5 lg:grid-cols-2">
      {SKILL_GROUPS.map((group, index) => (
        <Reveal
          key={group.key}
          delay={index * 0.04}
          className={group.primary ? "lg:col-span-2" : undefined}
        >
          <SpotlightCard className="h-full p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg text-ink">{group.label}</h3>
              {group.primary && <Badge variant="accent">Primary</Badge>}
            </div>

            {group.note && (
              <p className="mt-2 max-w-measure text-sm text-ink-3">{group.note}</p>
            )}

            {detailed && group.usedFor && (
              <p className="mt-5 max-w-measure border-l border-accent/40 pl-4 text-sm leading-relaxed text-ink-2">
                {group.usedFor}
              </p>
            )}

            <ul
              className={`flex flex-wrap gap-1.5 ${detailed ? "mt-6" : "mt-5"} ${
                group.primary ? "max-w-3xl" : ""
              }`}
            >
              {group.items.map((skill) => (
                <li key={skill}>
                  <Badge>{skill}</Badge>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Technologies;
