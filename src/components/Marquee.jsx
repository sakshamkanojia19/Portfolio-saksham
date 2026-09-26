import { MARQUEE_ITEMS } from "../constants";

const Row = () => (
  <div className="flex shrink-0 items-center gap-8 pr-8">
    {MARQUEE_ITEMS.map((item) => (
      <span
        key={item}
        className="flex items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-ink-4"
      >
        {item}
        <span className="h-[3px] w-[3px] rounded-full bg-accent/50" aria-hidden="true" />
      </span>
    ))}
  </div>
);

/**
 * Tech ticker. Entirely decorative, so the whole strip is aria-hidden — the
 * old version exposed a 15-item <ul> of stack names to screen readers, which
 * is 15 list items of noise between the hero and the first real section. The
 * same information is available properly on /skills.
 *
 * The edge masks fade to --bg rather than a hard-coded black; the old ones
 * used `from-black` against a #050505 page and showed as visible dark bars.
 */
const Marquee = () => (
  <div
    aria-hidden="true"
    className="relative -mx-5 overflow-hidden border-y border-line py-3.5 sm:-mx-8"
  >
    <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent" />
    <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent" />
    <div className="animate-marquee flex w-max motion-reduce:animate-none">
      <Row />
      <Row />
    </div>
  </div>
);

export default Marquee;
