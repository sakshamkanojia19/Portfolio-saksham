import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-6 py-3 sm:px-10">
        <div className="h-6 w-6" />

        <div className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative pb-1 transition hover:text-orange-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full ${
                  isActive ? "text-orange-300 after:w-full" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link to="/contact">Hire Me</Link>
          </Button>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-orange-300/50 hover:text-orange-300 lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden ${isOpen ? "block" : "hidden"} border-t border-white/10 bg-black/90`}
      >
        <div className="container mx-auto flex flex-col gap-4 px-6 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-[0.2em] transition hover:text-orange-300 ${
                  isActive ? "text-orange-300" : "text-white/70"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button asChild size="sm">
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Hire Me
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
