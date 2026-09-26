import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import { EASE } from "./Reveal";

const Layout = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <m.main
          id="main-content"
          key={location.pathname}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mx-auto w-full max-w-shell-wide flex-1 px-5 pb-[var(--gap-section)] pt-28 sm:px-8 sm:pt-32"
        >
          <Outlet />
        </m.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Layout;
