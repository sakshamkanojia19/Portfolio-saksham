import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Number that counts up from 0 when it scrolls into view. Renders the final
 * value immediately under prefers-reduced-motion. Text is set imperatively so
 * the tween never triggers React re-renders.
 */
const Counter = ({ value, suffix = "", duration = 1.4, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return undefined;
    if (prefersReducedMotion) {
      node.textContent = `${value}${suffix}`;
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, prefersReducedMotion]);

  // Final value as initial content — meaningful for crawlers and if JS tweens
  // are interrupted; the effect resets it to 0 and counts up when visible.
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
};

export default Counter;
