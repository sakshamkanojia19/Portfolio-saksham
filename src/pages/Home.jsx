import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Statement from "../components/Statement";
import HomeEntries from "../components/HomeEntries";
import Projects from "../components/Projects";
import WorkWithMe from "../components/WorkWithMe";
import CtaBand from "../components/CtaBand";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import useDocumentMeta from "../hooks/useDocumentMeta";

/**
 * The home page summarises and routes. It deliberately does NOT render the
 * full About / Skills / Experience / Exploring / Contact sections any more —
 * doing so made every navigation item a duplicate of something the visitor
 * had already scrolled past.
 */
const Home = () => {
  useDocumentMeta(
    "Saksham Kanojia — AI Automation Engineer & Full-Stack Developer",
    "I build AI-native products and automation systems with LLMs, RAG pipelines, and scalable SaaS that deliver measurable impact."
  );

  return (
    <div className="space-y-[var(--gap-section)]">
      <Hero />
      <Marquee />
      <Statement />
      <HomeEntries />

      <div className="space-y-[var(--gap-block)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems that went to production."
            lede="Three builds, each solving a problem that used to be someone's manual afternoon."
          />
          <Reveal>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-ink-2 transition-colors hover:text-accent"
            >
              All case studies
              <FiArrowRight
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>

        <Projects showHeading={false} variant="compact" />
      </div>

      <WorkWithMe />
      <CtaBand />
    </div>
  );
};

export default Home;
