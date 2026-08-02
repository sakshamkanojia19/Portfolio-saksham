import AiPov from "../components/AiPov";
import Writing from "../components/Writing";
import PageHeader from "../components/PageHeader";
import { Separator } from "../components/ui/separator";
import useDocumentMeta from "../hooks/useDocumentMeta";

const AiPovPage = () => {
  useDocumentMeta(
    "AI POV — Saksham Kanojia",
    "How Saksham Kanojia thinks about building AI: permission-aware retrieval, AI-native architecture, graceful degradation, and cost as a feature."
  );

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="AI POV"
        title="How I think about building AI."
        subtitle="Opinions earned from shipping LLM systems that had to hold up in production — under real permissions, real latency, and a real budget."
      />
      <AiPov showHeading={false} />
      <Separator />
      <Writing />
    </div>
  );
};

export default AiPovPage;
