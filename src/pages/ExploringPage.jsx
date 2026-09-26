import CurrentlyExploring from "../components/CurrentlyExploring";
import Writing from "../components/Writing";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { CURRENTLY_EXPLORING } from "../constants";

const ExploringPage = () => {
  useDocumentMeta(
    "Currently Exploring — Saksham Kanojia",
    "Agent architectures and memory, LLM evaluation frameworks, observability and tracing, MCP, open-weight models, and voice AI."
  );

  return (
    <div className="space-y-[var(--gap-section)]">
      <PageHeader
        eyebrow="Currently Exploring"
        title={["What I'm", "learning,", "and why."]}
        lede="An honest list of what has my attention right now. Each item includes the reason it earns the time — a reading list without an argument is just a list."
        meta={`${CURRENTLY_EXPLORING.items.length} threads · updated as they change`}
      />

      <CurrentlyExploring />
      <Writing />
      <CtaBand
        title="Working on any of these?"
        body="Evaluation and tracing especially — I'd love to compare notes."
      />
    </div>
  );
};

export default ExploringPage;
