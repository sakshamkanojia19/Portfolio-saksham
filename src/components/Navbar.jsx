import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { FiCommand, FiMenu, FiX } from "react-icons/fi";
import { NAV } from "../constants";
import { Button } from "./ui/button";
import { EASE } from "./Reveal";
import CommandPalette from "./CommandPalette";
import useScrollLock from "../hooks/useScrollLock";

/**
 * Detached floating dock.
 *
 * The header is no longer a full-bleed bar pinned to the top edge — it is two
 * free-floating capsules pushed to the outer edges, with the page visibly
 * running underneath them. Navigation sits in the left capsule alongside the
 * wordmark; the actions get a capsule of their own so a primary CTA never
 * competes for the same container as eight nav links.
 *
 * Everything scaled up: 56px capsules, 14–15px labels, real padding per item.
 */
const capsule = [
  "flex items-center rounded-full border shadow-e3",
  // Inset hairline catches the top edge, so the capsule reads as a lit glass
  // object floating over the page rather than a flat patch of slightly
  // lighter grey.
  "ring-1 ring-inset ring-white/[0.05]",
  "backdrop-blur-xl transition-[background-color,border-color] duration-300",
].join(" ");

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();

  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useScrollLock(menuOpen);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global ⌘K / Ctrl+K. Ignored while typing in a field so the shortcut can
  // never hijack the contact form.
  useEffect(() => {
    const onKeyDown = (event) => {
      const tag = event.target?.tagName;
      const typing =
        tag === "INPUT" || tag === "TEXTAREA" || event.target?.isContentEditable;

      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
        return;
      }
      if (event.key === "/" && !typing && !paletteOpen) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [paletteOpen]);

  // Mobile sheet: Escape closes, and Tab is confined to the panel.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Floating capsules sit over live content, so they carry their own surface
  // at all times — they just firm up once the page has scrolled under them.
  const surface = scrolled || menuOpen
    ? "border-white/[0.16] bg-surface/95"
    : "border-white/[0.1] bg-surface/80";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-shell-wide items-center justify-between gap-3 px-4 pt-3 sm:px-6 sm:pt-4"
        >
          {/* Wordmark + navigation */}
          <div className={`${capsule} ${surface} gap-1 py-2 pl-4 pr-2 lg:pl-5`}>
            <Link
              to="/"
              aria-label="Saksham Kanojia — home"
              className="shrink-0 font-display text-lg font-semibold tracking-tight text-ink transition-colors hover:text-accent"
            >
              SK<span className="text-accent">.</span>
            </Link>

            <span
              className="mx-3 hidden h-6 w-px shrink-0 bg-line lg:block"
              aria-hidden="true"
            />

            {/* The active pill is one shared element that slides between items
                via layoutId — it reads as a single object moving, rather than
                eight independent underlines lighting up. */}
            <ul className="hidden items-center lg:flex">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `relative flex h-10 items-center rounded-full px-3 text-[14px] font-medium transition-colors xl:px-4 xl:text-[15px] ${
                        isActive ? "text-ink" : "text-ink-3 hover:text-ink"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <m.span
                            layoutId="nav-pill"
                            transition={
                              prefersReducedMotion
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 420, damping: 36 }
                            }
                            className="absolute inset-0 rounded-full bg-white/[0.1]"
                            aria-hidden="true"
                          />
                        )}
                        <span className="relative whitespace-nowrap">
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className={`${capsule} ${surface} gap-1.5 p-2`}>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden h-10 items-center gap-1.5 rounded-full px-3.5 text-ink-3 transition-colors hover:bg-white/[0.06] hover:text-ink sm:flex"
            >
              <FiCommand aria-hidden="true" />
              <span className="font-mono text-[13px]">K</span>
            </button>

            <Button asChild size="md" className="hidden h-10 sm:inline-flex">
              <Link to="/contact">Hire me</Link>
            </Button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-white/[0.06] hover:text-ink lg:hidden"
            >
              {menuOpen ? (
                <FiX className="text-lg" aria-hidden="true" />
              ) : (
                <FiMenu className="text-lg" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            {/* Floating card rather than a full-bleed sheet, so it belongs to
                the same detached language as the capsules above it. */}
            <m.div
              ref={panelRef}
              id="mobile-menu"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, scale: 0.98 }
              }
              transition={{ duration: 0.26, ease: EASE }}
              className="fixed inset-x-4 top-[var(--header-h)] z-[95] max-h-[calc(100dvh-var(--header-h)-1rem)] origin-top overflow-y-auto rounded-lg border border-line-strong bg-surface/95 p-4 shadow-e3 backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col">
                {NAV.map((item, index) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-baseline justify-between gap-4 rounded-sm px-2 py-3 transition-colors ${
                          index > 0 ? "border-t border-line" : ""
                        } ${isActive ? "text-accent" : "text-ink-2 hover:text-ink"}`
                      }
                    >
                      <span className="font-display text-lg">{item.label}</span>
                      <span className="font-mono text-2xs text-ink-4">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-2.5">
                <Button asChild size="lg">
                  <Link to="/contact" onClick={() => setMenuOpen(false)}>
                    Hire me
                  </Link>
                </Button>
                <Button
                  variant="subtle"
                  size="lg"
                  onClick={() => {
                    setMenuOpen(false);
                    setPaletteOpen(true);
                  }}
                >
                  <FiCommand aria-hidden="true" />
                  Search everything
                </Button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
};

export default Navbar;
