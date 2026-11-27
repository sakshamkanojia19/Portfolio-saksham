"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One tiny client island that powers the site-wide motion layer:
// scroll reveals, the pointer-following card spotlight, the scroll progress
// bar, and the header's "scrolled" state. Pages stay server components and
// opt in with `data-reveal` / `.spotlight`. Without JavaScript nothing is
// hidden (reveals only apply under the `.js` root class).
export default function Interactions() {
  const path = usePathname();

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]:not(.is-in)");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  // Navigation progress: start the top loader bar the moment an internal link
  // to another page is clicked; stop it once the new pathname renders.
  useEffect(() => {
    const root = document.documentElement;
    delete root.dataset.navigating;
    let fallback = 0;
    function onClick(event) {
      // Capture phase: Next's <Link> calls preventDefault during bubbling.
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
      clearTimeout(fallback);
      document.removeEventListener("click", onClick, true);
    };
  }, [path]);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty(
          "--scroll",
          max > 0 ? (window.scrollY / max).toFixed(4) : "0",
        );
        root.dataset.scrolled = window.scrollY > 16 ? "true" : "false";
      });
    }
    function onPointer(event) {
      const card = event.target.closest?.(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="nav-progress" aria-hidden="true">
        <i />
      </div>
      <div className="route-veil" aria-hidden="true">
        <div className="loader-mark">
          <span className="loader-ring" />
          <span className="loader-ring r2" />
          <span className="loader-core">
            sk<span>.</span>
          </span>
        </div>
      </div>
    </>
  );
}
