import { NavLink, Link } from "react-router-dom";
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
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-6 py-3 sm:px-10">
        <div />

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

        <Button asChild size="sm" className="hidden lg:inline-flex">
          <Link to="/contact">Hire Me</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
