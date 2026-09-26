import { ABOUT_LONG, FOCUS_AREAS, PERSONAL } from "../constants";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Long-form about — the /about page only.
 *
 * The home page no longer renders this. Previously every route re-rendered the
 * same component with `showHeading={false}`, so /about showed a visitor exactly
 * what the home page already had, and there was no reason to click anything in
 * the navigation.
 */
const About = ({ showHeading = false }) => (
  <section
    aria-labelledby={showHeading ? "about-heading" : undefined}
    className="space-y-[var(--gap-block)]"
  >
    {showHeading && (
      <SectionHeading
        id="about-heading"
        eyebrow="About"
        title="I build autonomous AI systems that replace operational work."
      />
    )}

    <div className="grid gap-x-16 gap-y-[var(--gap-block)] lg:grid-cols-[1fr_auto]">
      <div className="space-y-10">
        {ABOUT_LONG.map((block, index) => (
          <Reveal key={block.heading} delay={index * 0.05}>
            <article className="grid gap-3 border-t border-line pt-6 sm:grid-cols-[auto_1fr] sm:gap-8">
              <h3 className="font-mono text-2xs uppercase tracking-[0.12em] text-accent sm:w-[9rem] sm:pt-1">
                {block.heading}
              </h3>
              <p className="max-w-measure text-base leading-relaxed text-ink-2">
                {block.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal x={24} className="lg:w-[17rem]">
        <aside className="space-y-8 lg:sticky lg:top-28">
          <div>
            <h3 className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
              Focus areas
            </h3>
            <ul className="mt-4 space-y-3">
              {FOCUS_AREAS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-2">
                  <span
                    className="mt-[9px] h-px w-3 shrink-0 bg-accent/70"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="space-y-5 border-t border-line pt-6">
            <div>
              <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                Working style
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-2">
                {PERSONAL.workingStyle}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                Beyond code
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-2">
                {PERSONAL.beyondCode}
              </dd>
            </div>
          </dl>
        </aside>
      </Reveal>
    </div>
  </section>
);

export default About;
