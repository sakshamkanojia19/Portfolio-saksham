import About from "../components/About";
import AiPov from "../components/AiPov";
import PageHeader from "../components/PageHeader";
import { Separator } from "../components/ui/separator";
import useDocumentMeta from "../hooks/useDocumentMeta";

const AboutPage = () => {
  useDocumentMeta(
    "About — Saksham Kanojia",
    "AI Automation Engineer building production LLM agents, RAG pipelines, and AI-native SaaS products from 0 to 1."
  );

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="About"
        title="AI automation engineer focused on measurable outcomes."
        subtitle="I design and deploy LLM-powered systems, intelligent workflows, and scalable services that reduce manual work and improve decision making."
      />
      <About showHeading={false} />
      <Separator />
      <AiPov />
    </div>
  );
};

export default AboutPage;
