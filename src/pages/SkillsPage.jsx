import Technologies from "../components/Technologies";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { SKILL_GROUPS } from "../constants";

const totalSkills = SKILL_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

const SkillsPage = () => {
  useDocumentMeta(
    "Skills — Saksham Kanojia",
    "LLMs, LangChain, LangGraph, RAG, Pinecone, FastAPI, Node.js, React, MongoDB, PostgreSQL, AWS, GCP, Docker, and CI/CD."
  );

  return (
    <div className="space-y-[var(--gap-section)]">
      <PageHeader
        eyebrow="Skills"
        title={["The stack,", "and what", "it's for."]}
        lede="A list of tools says nothing — every portfolio has one. What matters is which problem each layer was chosen to solve, so that's what this page shows."
        stats={[
          { label: "Groups", value: String(SKILL_GROUPS.length) },
          { label: "Technologies", value: `${totalSkills}` },
          { label: "Primary", value: "AI systems" },
          { label: "In production", value: "Daily" },
        ]}
      />

      <Technologies detailed />
      <CtaBand
        title="Need a specific piece of this?"
        body="Happy to go deep on retrieval design, agent orchestration, or the deployment side."
      />
    </div>
  );
};

export default SkillsPage;
