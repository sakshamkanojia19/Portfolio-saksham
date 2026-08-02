import { ABOUT_CONTENT, ABOUT_HIGHLIGHTS, FOCUS_AREAS } from "../constants";
import { Card } from "./ui/card";
import Counter from "./Counter";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const About = ({ showHeading = true }) => {
  return (
    <section
      aria-labelledby={showHeading ? "about-heading" : undefined}
      aria-label={showHeading ? undefined : "About"}
      className="space-y-8"
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal x={-32} className="space-y-6">
          {showHeading && (
            <SectionHeading
              id="about-heading"
              eyebrow="About"
              title="I build autonomous AI systems that replace operational work."
            />
          )}
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            {ABOUT_CONTENT}
          </p>
          <ul className="space-y-3 text-sm text-white/70 sm:text-base">
            {FOCUS_AREAS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {ABOUT_HIGHLIGHTS.map((item, index) => (
            <Reveal key={item.label} x={32} delay={index * 0.08}>
              <Card className="h-full space-y-1.5 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                  {item.label}
                </p>
                <p className="font-display text-3xl text-white">
                  {item.count != null ? (
                    <Counter value={item.count} suffix={item.suffix} />
                  ) : (
                    item.value
                  )}
                </p>
                <p className="text-xs leading-relaxed text-white/60">
                  {item.detail}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
