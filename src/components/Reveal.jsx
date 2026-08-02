import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MOBILE_QUERY = "(max-width: 768px)";

// Resolved during the very first render. If the animated branch renders even
// once before we know it's a small screen, framer-motion latches the initial
// opacity:0 and — because the element reconciles as an update rather than a
// remount — never animates back out, leaving the card permanently invisible.
const matchesMobile = () =>
  typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

/**
 * Scroll-reveal wrapper. By default elements come AND go — they animate in
 * when scrolled into view and fade back out when they leave, so the page feels
 * alive in both scroll directions. Pass `once` to keep an element after its
 * first reveal (forms, anything with focusable state).
 *
 * `x` slides in horizontally instead of vertically — used for the asymmetric
 * left/right entrances. Renders content immediately when the user prefers
 * reduced motion or is on a small screen.
 */
const Reveal = ({
  children,
  delay = 0,
  y = 24,
  x = 0,
  once = false,
  className,
  as = "div",
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(matchesMobile);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const disabled = prefersReducedMotion || isMobile;
  const MotionTag = motion[as] ?? motion.div;

  const from = x !== 0 ? { opacity: 0, x } : { opacity: 0, y };
  const to = x !== 0 ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 };

  // The disabled branch animates explicitly to the visible state rather than
  // simply omitting the motion props, so a mid-life switch can never strand the
  // element at opacity 0.
  const motionProps = disabled
    ? { initial: false, animate: to }
    : {
        initial: from,
        whileInView: to,
        viewport: { once, amount: 0.15, margin: "0px 0px -5% 0px" },
        transition: { duration: 0.55, delay, ease: "easeOut" },
      };

  return (
    <MotionTag className={className} {...motionProps}>
      {children}
    </MotionTag>
  );
};

export default Reveal;
