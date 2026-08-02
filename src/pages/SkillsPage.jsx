import Technologies from "../components/Technologies";
import PageHeader from "../components/PageHeader";
import useDocumentMeta from "../hooks/useDocumentMeta";

const SkillsPage = () => {
  useDocumentMeta(
    "Skills — Saksham Kanojia",
    "LLMs, LangChain, LangGraph, RAG, Pinecone, FastAPI, Node.js, React, MongoDB, PostgreSQL, AWS, GCP, Docker, and CI/CD."
  );

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Skills"
        title="Technology stack for AI-driven products."
        subtitle="A balanced set of AI, backend, frontend, and cloud tools used across production systems."
      />
      <Technologies showHeading={false} />
    </div>
  );
};

export default SkillsPage;
