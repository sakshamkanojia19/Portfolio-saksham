import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Cycles through a list of phrases with a vertical flip. Shows the first item
 * statically under prefers-reduced-motion.
 */
const RotatingText = ({ items, interval = 2600, className }) => {
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
    <span className={`relative inline-grid overflow-hidden align-bottom ${className ?? ""}`}>
      {/* Widest item reserves the box so the line never reflows mid-cycle. */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {items.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={items[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
