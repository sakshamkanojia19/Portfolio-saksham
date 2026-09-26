import AiPov from "../components/AiPov";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import useDocumentMeta from "../hooks/useDocumentMeta";

const AiPovPage = () => {
  useDocumentMeta(
    "AI POV — Saksham Kanojia",
    "Permissions before generation, AI-native architecture, graceful degradation, and why reliability and cost are features."
  );

  return (
    <div className="space-y-[var(--gap-section)]">
      <PageHeader
        eyebrow="AI POV"
        title={["Opinions,", "held for", "reasons."]}
        lede="Four principles I keep returning to when a system has to survive real users, real permissions, and a real budget. Each one below is an argument, not a slogan — and the first is demonstrated rather than described."
        meta="4 principles · ~4 min read"
      />

      <AiPov />
      <CtaBand
        title="Disagree with any of this?"
        body="Genuinely — I'd like to hear it. The retrieval-design arguments are the fun ones."
      />
    </div>
  );
};

export default AiPovPage;
