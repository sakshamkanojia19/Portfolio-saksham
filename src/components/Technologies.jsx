import { SKILL_GROUPS } from "../constants";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const Technologies = ({ showHeading = true }) => {
  return (
    <section
      aria-labelledby={showHeading ? "skills-heading" : undefined}
      aria-label={showHeading ? undefined : "Skills"}
      className="space-y-8"
    >
      {showHeading && (
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          accent="purple"
          title="The stack I use to ship AI products."
          lede="Grouped the way I actually work — AI systems first, then the infrastructure that keeps them reliable."
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, index) => (
          <Reveal
            key={group.key}
            delay={index * 0.05}
            className={group.key === "ai" ? "sm:col-span-2" : undefined}
          >
            <Card className="h-full space-y-4 p-5">
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 h-9 w-1 shrink-0 rounded-full ${
                    group.accent === "purple"
                      ? "bg-gradient-to-b from-purple-400 to-purple-600"
                      : "bg-gradient-to-b from-orange-300 to-orange-500"
                  }`}
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <h3 className="font-display text-base text-white sm:text-lg">
                    {group.label}
                  </h3>
                  {group.note && (
                    <p className="text-xs leading-relaxed text-white/50">
                      {group.note}
                    </p>
                  )}
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill}>
                    <Badge variant={group.accent}>{skill}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
