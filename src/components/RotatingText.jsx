import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";

/**
 * Cycles phrases with a vertical slide.
 *
 * Deliberately does NOT use AnimatePresence. With `mode="popLayout"` the
 * exiting spans were not being removed — the DOM accumulated one dead
 * `opacity: 0` node per cycle, forever. Keying a single element off the index
 * lets React remount it and framer animate it in, which is all this needs:
 * there is no exit state worth keeping, and nothing can pile up.
 */
const RotatingText = ({ items, interval = 2800, className }) => {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % items.length),
      interval
    );
    return () => clearInterval(timer);
  }, [items.length, interval, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{items[0]}</span>;
  }

  return (
    <span
      className={`relative inline-grid overflow-hidden align-bottom ${className ?? ""}`}
    >
      {/* The longest item reserves the box so the line never reflows mid-cycle. */}
      <span
        className="invisible col-start-1 row-start-1 whitespace-nowrap"
        aria-hidden="true"
      >
        {items.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>

      <m.span
        key={index}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="col-start-1 row-start-1 whitespace-nowrap"
      >
        {items[index]}
      </m.span>
    </span>
  );
};

export default RotatingText;
