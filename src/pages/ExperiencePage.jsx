import Experience from "../components/Experience";
import PageHeader from "../components/PageHeader";

const ExperiencePage = () => {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Experience"
        title="End-to-end ownership across AI and full-stack delivery."
        subtitle="From requirements to deployment, with focus on automation and reliability."
      />
      <Experience />
    </div>
  );
};

export default ExperiencePage;
