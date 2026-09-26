import About from "../components/About";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { EDUCATION, PROFILE } from "../constants";

const AboutPage = () => {
  useDocumentMeta(
    "About — Saksham Kanojia",
    "AI Automation Engineer building production LLM agents, RAG pipelines, and AI-native SaaS products from 0 to 1."
  );

  return (
    <div className="space-y-[var(--gap-section)]">
      <PageHeader
        eyebrow="About"
        title={["Engineer first.", "AI is how", "I get there."]}
        lede="I design and deploy LLM-powered systems, intelligent workflows, and scalable services that reduce manual work and improve decision making — owning them from architecture through to the iteration after launch."
        meta={`${PROFILE.location} · ${EDUCATION.degree}, ${EDUCATION.score}`}
      />

      <About />
      <CtaBand
        title="Want the short version?"
        body="The resume covers the timeline. This page covers the reasoning."
      />
    </div>
  );
};

export default AboutPage;
