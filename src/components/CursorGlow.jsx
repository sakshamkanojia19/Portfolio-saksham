import { useEffect, useRef } from "react";

/**
 * Site-wide cursor light.
 *
 * Replaces the spotlight that used to live inside the hero only — it was
 * scoped to that one section, and `lg:block` meant it did not exist at all
 * below 1024px. This sits above the page content with a `screen` blend, so
 * the light reads across every section and every route, including over cards
 * and the side gutters.
 *
 * Position is written straight to CSS custom properties inside a rAF, so the
 * pointer never triggers a React render. Fixed positioning means it needs no
 * scroll listener either.
 */
const CursorGlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    // Skip entirely where it would be wrong or wasted: touch input (there is
    // no cursor to follow) and reduced-motion.
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return undefined;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      node.style.setProperty("--cx", `${x}px`);
      node.style.setProperty("--cy", `${y}px`);
      node.style.opacity = "1";
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    // Fade out when the pointer leaves the window so a stale light doesn't
    // sit burned into a corner.
    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
};

export default CursorGlow;
