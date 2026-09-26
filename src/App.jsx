import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LazyMotion, domMax } from "framer-motion";
import Layout from "./components/Layout";
import Backdrop from "./components/Backdrop";
import CursorGlow from "./components/CursorGlow";
import ScrollToTop from "./components/ScrollToTop";
// Home is the entry point for almost every visitor, so it stays in the main
// chunk. The other seven routes are split out and fetched on navigation.
import Home from "./pages/Home";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const AiPovPage = lazy(() => import("./pages/AiPovPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ExploringPage = lazy(() => import("./pages/ExploringPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Route fallback. Deliberately a reserved block rather than a spinner — the
 * chunks are small enough that a spinner would flash in and out, which reads
 * worse than a brief hold.
 */
const RouteFallback = () => (
  <div className="min-h-[60vh]" role="status" aria-label="Loading page" />
);

/**
 * `LazyMotion` + the lightweight `m` element replaces the full `motion` import
 * that each animated component pulled in separately. `domMax` (not
 * `domAnimation`) is required because the navbar's active pill is a
 * shared-layout animation.
 */
const App = () => (
  <LazyMotion features={domMax} strict>
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-ink-2">
      <Backdrop />
      <CursorGlow />
      <ScrollToTop />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/ai-pov" element={<AiPovPage />} />
                  <Route path="/skills" element={<SkillsPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/exploring" element={<ExploringPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  </LazyMotion>
);

export default App;
