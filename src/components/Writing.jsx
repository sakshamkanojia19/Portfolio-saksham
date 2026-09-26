import { FiArrowUpRight } from "react-icons/fi";
import { WRITING } from "../constants";
import { SpotlightCard } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Notes teaser.
 *
 * A `pending` post is one whose direct URL isn't in the constants yet — it
 * links to the profile instead. That is now stated on the card rather than
 * presented as a published article, which is what the previous version did.
 */
const Writing = ({ showHeading = true }) => {
  if (!WRITING.posts.length) return null;

  return (
    <section aria-labelledby="writing-heading" className="space-y-[var(--gap-block)]">
      {showHeading && (
        <SectionHeading
          id="writing-heading"
          eyebrow="Writing / Notes"
          title="Thinking out loud."
          lede={WRITING.intro}
        />
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {WRITING.posts.map((post, index) => (
          <Reveal key={post.title} delay={index * 0.05} className="h-full">
            <SpotlightCard
              as="a"
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                  {post.source}
                </span>
                <FiArrowUpRight
                  className="text-ink-4 transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-4 font-display text-base text-ink">{post.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{post.blurb}</p>

              {post.pending && (
                <p className="mt-4 font-mono text-2xs text-ink-4">
                  Draft — opens my {post.source} profile for now
                </p>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Writing;
