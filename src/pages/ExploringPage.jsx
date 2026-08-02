import CurrentlyExploring from "../components/CurrentlyExploring";
import PageHeader from "../components/PageHeader";
import useDocumentMeta from "../hooks/useDocumentMeta";

const ExploringPage = () => {
  useDocumentMeta(
    "Currently Exploring — Saksham Kanojia",
    "Agent architectures and memory, LLM evaluation, observability for agentic systems, MCP, open-weight models, and voice AI."
  );

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Currently Exploring"
        title="What I'm going deeper on right now."
        subtitle="A running list of the problems and tools I'm actively digging into — updated as they change."
      />
      <CurrentlyExploring showHeading={false} />
    </div>
  );
};

export default ExploringPage;
