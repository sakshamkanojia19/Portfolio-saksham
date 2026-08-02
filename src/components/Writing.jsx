import { FiArrowUpRight } from "react-icons/fi";
import { WRITING } from "../constants";
import { Card } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Teaser for long-form notes. Add entries to WRITING.posts in
 * src/constants/index.js — the grid scales without touching this file.
 */
const Writing = () => {
  if (!WRITING.posts.length) return null;

  return (
    <section aria-labelledby="writing-heading" className="space-y-8">
      <SectionHeading
        id="writing-heading"
        eyebrow="Writing / Notes"
        title="Thinking out loud."
        lede={WRITING.intro}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {WRITING.posts.map((post, index) => (
          <Reveal key={post.title} delay={index * 0.06}>
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
            >
              <Card className="group flex h-full flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                    {post.source}
                  </span>
                  <FiArrowUpRight
                    className="text-white/40 transition group-hover:text-orange-300"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-base text-white sm:text-lg">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">
                  {post.blurb}
                </p>
              </Card>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Writing;
