import { CURRENTLY_EXPLORING, PERSONAL } from "../constants";
import { SpotlightCard } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Each item now says *why* it's worth the time, which is the difference
 * between a reading list and a point of view. The six synchronised pulsing
 * dots are gone — six things blinking at once was noise, not life.
 */
const CurrentlyExploring = ({ showHeading = false }) => {
  const { intro, items, humanNote } = CURRENTLY_EXPLORING;

  return (
    <section
      aria-labelledby={showHeading ? "exploring-heading" : undefined}
      className="space-y-[var(--gap-block)]"
    >
      {showHeading && (
        <SectionHeading
          id="exploring-heading"
          eyebrow="Currently Exploring"
          title="Learning in public."
          lede={intro}
        />
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04} className="h-full">
            <SpotlightCard className="h-full p-6">
              <div className="flex items-baseline gap-3">
                <span className="index-num text-base font-semibold" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base text-ink">{item.title}</h3>
              </div>

              <p className="mt-2 font-mono text-2xs text-ink-4">{item.detail}</p>

              {item.why && (
                <p className="mt-4 text-sm leading-relaxed text-ink-2">{item.why}</p>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-[1fr_auto] sm:gap-16">
          <p className="max-w-measure text-base leading-relaxed text-ink-2">
            {humanNote}
          </p>
          <dl className="space-y-5 sm:w-[18rem]">
            <div>
              <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                Beyond code
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-2">
                {PERSONAL.beyondCode}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                Current obsession
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-2">
                {PERSONAL.funFact}
              </dd>
            </div>
          </dl>
        </div>
      </Reveal>
    </section>
  );
};

export default CurrentlyExploring;
