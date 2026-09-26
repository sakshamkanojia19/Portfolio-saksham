import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { HOME_ENTRIES } from "../constants";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Doorways into the rest of the site.
 *
 * This replaces the old home page, which rendered every section in full and
 * then linked to routes that re-rendered the exact same components. The home
 * page now summarises and routes; the depth lives on the pages themselves.
 */
const HomeEntries = () => (
  <section aria-labelledby="explore-heading" className="space-y-[var(--gap-block)]">
    <SectionHeading
      id="explore-heading"
      eyebrow="Explore"
      title="Where to go from here."
      lede="Each of these is a page in its own right — the detail lives there, not in a summary."
    />

    <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
      {HOME_ENTRIES.map((entry, index) => (
        <Reveal key={entry.to} delay={index * 0.05} className="h-full">
          <Link
            to={entry.to}
            className="group flex h-full flex-col bg-bg p-7 transition-colors hover:bg-surface sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow">
                <span className="tok">{"// "}</span>
                {entry.eyebrow.toLowerCase()}
              </span>
              <span className="font-mono text-2xs text-ink-4">{entry.meta}</span>
            </div>

            <h3 className="mt-5 font-display text-xl text-ink">{entry.title}</h3>

            <p className="mt-3 max-w-measure flex-1 text-sm leading-relaxed text-ink-2">
              {entry.blurb}
            </p>

            <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink-3 transition-colors group-hover:text-accent">
              Read more
              <FiArrowRight
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  </section>
);

export default HomeEntries;
