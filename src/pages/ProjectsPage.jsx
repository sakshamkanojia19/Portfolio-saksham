import Projects from "../components/Projects";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { PROJECTS } from "../constants";

const ProjectsPage = () => {
  useDocumentMeta(
    "Projects — Saksham Kanojia",
    "CollabDocs (permission-aware RAG workspace), AI Lead Intelligence Agent, and an AI-powered medical service chatbot."
  );

  return (
    <div className="space-y-[var(--gap-section)]">
      <PageHeader
        eyebrow="Projects"
        title={["Three systems,", "and why they", "work that way."]}
        lede="Each of these replaced work someone was doing by hand. The interesting part isn't the stack — it's the architectural decision that made the guarantee possible."
        stats={[
          { label: "Case studies", value: String(PROJECTS.length) },
          { label: "Live demos", value: String(PROJECTS.filter((p) => p.link).length) },
          { label: "Span", value: "2024 — 2025" },
          { label: "Ownership", value: "0→1" },
        ]}
      />

      {/* `full` adds the problem/approach narrative that makes this page worth
          visiting rather than a re-render of the home page's teaser cards. */}
      <Projects showHeading={false} variant="full" />

      <CtaBand
        title="Want a walkthrough?"
        body="I'm glad to talk through the architecture of any of these, including the parts that didn't work first time."
      />
    </div>
  );
};

export default ProjectsPage;
