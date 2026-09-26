import { m, useReducedMotion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

// One shared transition for the entire site. Previously every component
// invented its own duration/easing, so nothing felt like it belonged together.
export const EASE = [0.16, 1, 0.3, 1];
export const REVEAL_DURATION = 0.7;

/**
 * Scroll reveal.
 *
 * Two deliberate corrections to the old behaviour:
 *
 * 1. Mobile is no longer opted out entirely. It previously rendered a
 *    completely static page — the polish only existed for desktop, which is
 *    backwards for a portfolio most people open on a phone. Small screens now
 *    get a cheaper version (shorter travel, no stagger) instead of nothing.
 *
 * 2. Reveals fire ONCE. The old default re-ran in both directions, so
 *    scrolling back up made content fade out as you moved toward it — which
 *    reads as a rendering bug, not as polish.
 */
const Reveal = ({
  children,
  delay = 0,
  y = 20,
  x = 0,
  blur = false,
  className,
  as = "div",
  amount = 0.2,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 768px)");

  const Tag = m[as] ?? m.div;

  if (prefersReducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const travel = isCompact ? Math.min(y, 12) : y;
  const shift = isCompact ? 0 : x;

  return (
    <Tag
      className={className}
      initial={{
        opacity: 0,
        y: shift === 0 ? travel : 0,
        x: shift,
        filter: blur && !isCompact ? "blur(6px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: isCompact ? 0.45 : REVEAL_DURATION,
        delay: isCompact ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
