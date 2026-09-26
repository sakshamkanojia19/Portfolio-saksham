import { AI_POV } from "../constants";
import { Badge } from "./ui/badge";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TraceTerminal from "./TraceTerminal";

/**
 * The four principles, as arguments rather than captions.
 *
 * `compact` renders the one-line version (used where the POV is being teased);
 * the /ai-pov page renders the full essay for each, which is what makes that
 * route worth visiting on its own.
 */
const AiPov = ({ showHeading = false, compact = false }) => (
  <section
    aria-labelledby={showHeading ? "ai-pov-heading" : undefined}
    className="space-y-[var(--gap-block)]"
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
      <figure className="space-y-3">
        <TraceTerminal />
        <figcaption className="font-mono text-2xs text-ink-4">
          The first principle, running. Nine of twelve matching chunks are
          discarded before the model is ever called.
        </figcaption>
      </figure>
    </Reveal>

    <ol className={compact ? "grid gap-5 md:grid-cols-2" : "space-y-0"}>
      {AI_POV.map((principle, index) => (
        <Reveal key={principle.title} delay={index * 0.05} as="li">
          <article
            className={
              compact
                ? "h-full rounded-lg border border-line bg-surface/70 p-6"
                : "grid gap-4 border-t border-line py-9 sm:grid-cols-[auto_1fr] sm:gap-10"
            }
          >
            <div className="flex items-baseline gap-4 sm:w-[7rem] sm:flex-col sm:gap-2">
              <span className="index-num text-2xl font-semibold" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {principle.evidence && !compact && (
                <Badge variant="accent">{principle.evidence}</Badge>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="font-display text-lg text-ink">{principle.title}</h3>
              <p className="mt-3 max-w-measure text-base leading-relaxed text-ink-2">
                {principle.description}
              </p>
              {!compact && principle.body && (
                <p className="mt-4 max-w-measure text-sm leading-relaxed text-ink-3">
                  {principle.body}
                </p>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  </section>
);

export default AiPov;
