"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  ["/projects", "Projects"],
  ["/posts", "Posts"],
  ["/writing", "Writing"],
  ["/about", "About"],
];

function ThemeIcon({ dark }) {
  return dark ? (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const finishThemeTransition = useRef(null);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);
  useEffect(() => () => {
    finishThemeTransition.current?.();
  }, []);
  useEffect(() => setOpen(false), [path]);
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    finishThemeTransition.current?.(false);
    root.classList.toggle("theme-transitioning", animate);
    if (animate) {
      // Establish the transition before changing the theme variables.
      getComputedStyle(document.body).transitionDuration;
      let timer;
      const finish = (removeClass = true) => {
        window.clearTimeout(timer);
        document.body.removeEventListener("transitionend", onEnd);
        if (removeClass) root.classList.remove("theme-transitioning");
        if (finishThemeTransition.current === finish) finishThemeTransition.current = null;
      };
      const onEnd = (event) => {
        if (event.target === document.body && event.propertyName === "background-color") finish();
      };
      document.body.addEventListener("transitionend", onEnd);
      timer = window.setTimeout(finish, 1600);
      finishThemeTransition.current = finish;
    }
    setTheme(next);
    root.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {}
  }
  const close = () => setOpen(false);
  return (
    <header className={open ? "header menu-open" : "header"}>
      <div className="header-inner">
        <Link
          className="wordmark"
          href="/"
          onClick={close}
          aria-label="Saksham Kanojia home"
        >
          Saksham Kanojia<span className="wordmark-dot">.</span>
        </Link>
        <nav
          id="main-nav"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {LINKS.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path.startsWith(href) ? "page" : undefined}
              onClick={close}
            >
              {label}
            </Link>
          ))}
          <Link className="nav-cta" href="/work-with-me" onClick={close}>
            Hire me
          </Link>
        </nav>
        <div className="header-tools">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title="Change theme"
          >
            <ThemeIcon dark={theme === "dark"} />
          </button>
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <span className="menu-bars" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
