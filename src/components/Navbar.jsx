import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "AI POV", to: "/ai-pov" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Exploring", to: "/exploring" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile panel on navigation.
  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        isScrolled || isOpen
          ? "border-white/10 bg-black/80 backdrop-blur-md"
          : "border-transparent bg-black/40 backdrop-blur"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="container mx-auto flex items-center justify-between gap-4 px-6 py-3 sm:px-10"
      >
        <Link
          to="/"
          className="font-display text-sm font-semibold tracking-[0.2em] text-white transition hover:text-orange-300"
        >
          SK<span className="text-orange-400">.</span>
        </Link>

        <ul className="hidden items-center gap-4 text-[13px] text-white/70 lg:flex xl:gap-6 xl:text-sm">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative whitespace-nowrap pb-1 transition hover:text-orange-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-purple-400 after:to-orange-400 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "text-orange-300 after:w-full" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link to="/contact">Hire Me</Link>
          </Button>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-orange-300/50 hover:text-orange-300 lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!isOpen}
        className="border-t border-white/10 bg-black/95 lg:hidden"
      >
        <ul className="container mx-auto flex flex-col gap-1 px-6 py-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] transition hover:bg-white/5 hover:text-orange-300 ${
                    isActive ? "bg-white/5 text-orange-300" : "text-white/70"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-2">
            <Button asChild size="sm" className="w-full">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Hire Me
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
