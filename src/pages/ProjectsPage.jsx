import Projects from "../components/Projects";
import PageHeader from "../components/PageHeader";
import useDocumentMeta from "../hooks/useDocumentMeta";

const ProjectsPage = () => {
  useDocumentMeta(
    "Projects — Saksham Kanojia",
    "CollabDocs (permission-aware RAG workspace), AI Lead Intelligence Agent, and an AI-powered medical service chatbot."
  );

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Projects"
        title="Selected work across AI, automation, and product engineering."
        subtitle="Each project focuses on measurable impact, performance, and reliability."
      />
      <Projects showHeading={false} />
    </div>
  );
};

export default ProjectsPage;
