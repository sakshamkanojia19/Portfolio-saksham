import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import AiPov from "../components/AiPov";
import Technologies from "../components/Technologies";
import Projects from "../components/Projects";
import CurrentlyExploring from "../components/CurrentlyExploring";
import Experience from "../components/Experience";
import Writing from "../components/Writing";
import WorkWithMe from "../components/WorkWithMe";
import Contact from "../components/Contact";
import { Separator } from "../components/ui/separator";
import useDocumentMeta from "../hooks/useDocumentMeta";

// Each section owns its own scroll-reveal at the card level — deliberately not
// wrapped in an outer reveal here, so a tall section never fades in as one
// giant block (and never sits invisible if its threshold isn't met).
const sections = [
  { id: "about", Component: About },
  { id: "ai-pov", Component: AiPov },
  { id: "skills", Component: Technologies },
  { id: "projects", Component: Projects },
  { id: "exploring", Component: CurrentlyExploring },
  { id: "experience", Component: Experience },
  { id: "writing", Component: Writing },
  { id: "work-with-me", Component: WorkWithMe },
  { id: "contact", Component: Contact },
];

const Home = () => {
  useDocumentMeta(
    "Saksham Kanojia — AI Automation Engineer & Full-Stack Developer",
    "I build AI-native products and automation systems with LLMs, RAG pipelines, and scalable SaaS that deliver measurable impact."
  );

  return (
    <div className="space-y-16 sm:space-y-20">
      <Hero />
      <Marquee />
      {sections.map(({ id, Component }, index) => (
        <div key={id} id={id} className="relative scroll-mt-24 space-y-16 sm:space-y-20">
          {index > 0 && <Separator />}
          {/* Oversized ghost index — outlined editorial marker, not content. */}
          <span
            aria-hidden="true"
            className="ghost-number pointer-events-none absolute -top-6 right-0 select-none font-display text-[5rem] font-bold leading-none sm:text-[8rem]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <Component />
        </div>
      ))}
    </div>
  );
};

export default Home;
