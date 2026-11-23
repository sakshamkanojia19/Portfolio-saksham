"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {}
  }
  return (
    <header className="header">
      <div className="header-inner">
        <Link
          className="wordmark"
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Saksham Kanojia home"
        >
          <span className="monogram">
            sk<span>.</span>
          </span>
          <span>
            Saksham Kanojia<span className="wordmark-sub">AI ENGINEER</span>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav
          id="main-nav"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {[
            ["/", "Home"],
            ["/projects", "Projects"],
            ["/writing", "Writing"],
            ["/about", "About"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                path === href || (href !== "/" && path.startsWith(href))
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="nav-contact"
            href="/work-with-me"
            onClick={() => setOpen(false)}
          >
            Work with me
          </Link>
        </nav>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title="Change theme"
        >
          {theme === "dark" ? "☼" : "☾"}
        </button>
      </div>
    </header>
  );
}
