"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { animate, stagger } from "motion";
import { motion, useScroll } from "motion/react";
import useMotionPreference from "./useMotionPreference";

// Site-wide motion layer, kept deliberately quiet:
// - fade-up reveals for `[data-reveal]` (content stays visible without JS)
// - `data-scrolled` on <html> for the header hairline
// - a thin top bar while navigating between pages
// - a back-to-top button after the first screen
// Reduced motion disables the reveal movement.
export default function Interactions() {
  const path = usePathname();
  const [showTop, setShowTop] = useState(false);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const root = document.documentElement;
    delete root.dataset.navigating;
    const animations = [];

    const reveals = document.querySelectorAll("[data-reveal]:not(.is-in)");
    let io;
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-in");
            const siblings = [...entry.target.parentElement.children];
            const order = siblings.indexOf(entry.target) % 3;
            animations.push(animate(entry.target, {
              opacity: [0.15, 1], y: [24, 0],
            }, { duration: 0.65, delay: order * 0.07, ease: [0.22, 1, 0.36, 1] }));
            io.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
      );
      reveals.forEach((el) => io.observe(el));
    }
    const heroCopy = document.querySelector("[data-hero-enter]");
    if (heroCopy && !reduce) {
      animations.push(animate([...heroCopy.children], {
        opacity: [0, 1], y: [18, 0],
      }, { duration: 0.7, delay: stagger(0.07), ease: [0.22, 1, 0.36, 1] }));
    }

    let frame = 0;
    function update() {
      frame = 0;
      root.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
      setShowTop(window.scrollY > window.innerHeight);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Next's <Link> prevents default while bubbling, so listen in capture.
    let fallback = 0;
    function onClick(event) {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;
      const url = new URL(link.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname === window.location.pathname
      )
        return;
      root.dataset.navigating = "true";
      clearTimeout(fallback);
      fallback = setTimeout(() => delete root.dataset.navigating, 12000);
    }
    document.addEventListener("click", onClick, true);

    return () => {
      io?.disconnect();
      animations.forEach(animation => animation.stop());
      document.querySelectorAll("[data-reveal], [data-hero-enter] > *").forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
    };
  }, [path, reduce]);

  return (
    <>
      <div className="nav-progress" aria-hidden="true" />
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <button
        type="button"
        className={showTop ? "to-top visible" : "to-top"}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" })}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>
    </>
  );
}
