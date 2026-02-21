import Technologies from "../components/Technologies";
import PageHeader from "../components/PageHeader";

const SkillsPage = () => {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Skills"
        title="Technology stack for AI-driven products."
        subtitle="A balanced set of AI, backend, frontend, and cloud tools used across production systems."
      />
      <Technologies />
    </div>
  );
};

export default SkillsPage;
