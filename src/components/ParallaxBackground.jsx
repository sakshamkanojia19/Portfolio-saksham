import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed background: gradient orbs drifting at different speeds as the page
 * scrolls (classic multi-plane parallax), plus a faint dot grid and film grain
 * so large dark areas never read as flat.
 */
const ParallaxBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Each layer moves at its own rate — depth without any scroll hijacking.
  const slow = useTransform(scrollY, [0, 3000], [0, 220]);
  const medium = useTransform(scrollY, [0, 3000], [0, -260]);
  const fast = useTransform(scrollY, [0, 3000], [0, 420]);

  const layerStyle = (value) => (prefersReducedMotion ? undefined : { y: value });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.30),_rgba(2,2,2,0.9)_60%)]" />

      <motion.div
        style={layerStyle(slow)}
        className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.22),_rgba(2,2,2,0))] blur-3xl"
      />
      <motion.div
        style={layerStyle(medium)}
        className="absolute -right-40 top-2/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(249,115,22,0.20),_rgba(2,2,2,0))] blur-3xl"
      />
      <motion.div
        style={layerStyle(fast)}
        className="absolute bottom-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(217,70,239,0.16),_rgba(2,2,2,0))] blur-3xl"
      />

      {/* Faint dot grid — reads as intentional graph paper, not a flat void. */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Film grain. */}
      <div className="grain absolute inset-0" />
    </div>
  );
};

export default ParallaxBackground;
