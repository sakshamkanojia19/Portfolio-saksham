import { AI_POV } from "../constants";
import { Card } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TraceTerminal from "./TraceTerminal";

const AiPov = ({ showHeading = true }) => {
  return (
    <section
      aria-labelledby={showHeading ? "ai-pov-heading" : undefined}
      aria-label={showHeading ? undefined : "AI POV"}
      className="space-y-8"
    >
      {showHeading && (
        <SectionHeading
          id="ai-pov-heading"
          eyebrow="AI POV"
          title="How I think about building AI."
          lede="Four principles I keep returning to when a system has to survive real users, real permissions, and a real budget."
        />
      )}

      {/* Principle #1, demonstrated instead of described. */}
      <Reveal>
        <TraceTerminal />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {AI_POV.map((principle, index) => (
          <Reveal key={principle.title} delay={index * 0.06}>
            <Card className="group h-full space-y-3">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-display text-sm text-orange-300/70"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base text-white sm:text-lg">
                  {principle.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                {principle.description}
              </p>
              <span
                className="block h-px w-10 bg-gradient-to-r from-purple-400 to-orange-400 transition-all duration-300 group-hover:w-20"
                aria-hidden="true"
              />
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default AiPov;
