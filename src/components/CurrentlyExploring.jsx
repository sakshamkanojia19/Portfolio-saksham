import { CURRENTLY_EXPLORING, PERSONAL } from "../constants";
import { Card } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const CurrentlyExploring = ({ showHeading = true }) => {
  const { intro, items, humanNote } = CURRENTLY_EXPLORING;

  return (
    <section
      aria-labelledby={showHeading ? "exploring-heading" : undefined}
      aria-label={showHeading ? undefined : "Currently exploring"}
      className="space-y-8"
    >
      {showHeading && (
        <SectionHeading
          id="exploring-heading"
          eyebrow="Currently Exploring"
          accent="purple"
          title="Learning in public."
          lede={intro}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <Card className="h-full space-y-2 p-5">
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 motion-reduce:animate-none"
                  aria-hidden="true"
                />
                <h3 className="font-display text-sm text-white sm:text-base">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-white/60 sm:text-sm">
                {item.detail}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/10 via-transparent to-orange-400/10 p-6 sm:p-8">
          <p className="max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
            {humanNote}
          </p>

          {(PERSONAL.beyondCode || PERSONAL.funFact) && (
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {PERSONAL.beyondCode && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-orange-300">
                    Beyond code
                  </dt>
                  <dd className="mt-1 text-sm text-white/70">
                    {PERSONAL.beyondCode}
                  </dd>
                </div>
              )}
              {PERSONAL.funFact && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-purple-300">
                    Fun fact
                  </dt>
                  <dd className="mt-1 text-sm text-white/70">
                    {PERSONAL.funFact}
                  </dd>
                </div>
              )}
            </dl>
          )}
          {/*
            TODO(saksham): fill PERSONAL.beyondCode and PERSONAL.funFact in
            src/constants/index.js — this block renders automatically once they
            are non-empty, and stays hidden until then.
          */}
        </div>
      </Reveal>
    </section>
  );
};

export default CurrentlyExploring;
