import { m, useReducedMotion } from "framer-motion";
import { EASE } from "./Reveal";

/**
 * Editorial page masthead. Each route is now a genuinely distinct destination,
 * so the header does real work: a breadcrumb-style path, a large title that
 * reveals line-by-line behind a mask, a lede held to a readable measure, and
 * an optional stat rail that gives the page an immediate factual anchor.
 */
const PageHeader = ({ eyebrow, title, lede, meta, stats }) => {
  const prefersReducedMotion = useReducedMotion();

  const titleLines = Array.isArray(title) ? title : [title];

  const lineAnim = (i) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { y: "110%" },
          animate: { y: 0 },
          transition: { duration: 0.9, delay: 0.06 + i * 0.075, ease: EASE },
        };

  return (
    <header className="relative border-b border-line pb-10">
      <m.p
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="eyebrow"
      >
        <span className="tok">~/</span>
        {eyebrow.toLowerCase().replace(/\s+/g, "-")}
      </m.p>

      <h1 className="mt-5 max-w-[16ch] text-4xl">
        {titleLines.map((line, i) => (
          <span key={line} className="line-mask">
            <m.span className="block" {...lineAnim(i)}>
              {line}
            </m.span>
          </span>
        ))}
      </h1>

      {lede && (
        <m.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
          className="mt-6 max-w-measure text-lg text-ink-3"
        >
          {lede}
        </m.p>
      )}

      {meta && (
        <m.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="mt-6 font-mono text-xs text-ink-4"
        >
          {meta}
        </m.p>
      )}

      {stats?.length > 0 && (
        <m.dl
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-bg px-4 py-4">
              <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                {stat.label}
              </dt>
              <dd className="mt-1.5 font-display text-lg text-ink">{stat.value}</dd>
            </div>
          ))}
        </m.dl>
      )}
    </header>
  );
};

export default PageHeader;
