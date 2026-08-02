import Experience from "../components/Experience";
import PageHeader from "../components/PageHeader";
import useDocumentMeta from "../hooks/useDocumentMeta";

const ExperiencePage = () => {
  useDocumentMeta(
    "Experience — Saksham Kanojia",
    "AI Automation Engineer at Digital Web Solutions, plus full-stack and generative AI internships."
  );

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Experience"
        title="End-to-end ownership across AI and full-stack delivery."
        subtitle="From requirements to deployment, with focus on automation and reliability."
      />
      <Experience showHeading={false} />
    </div>
  );
};

export default ExperiencePage;
