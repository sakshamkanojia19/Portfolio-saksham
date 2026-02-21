import Projects from "../components/Projects";
import PageHeader from "../components/PageHeader";

const ProjectsPage = () => {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Projects"
        title="Selected work across AI, automation, and product engineering."
        subtitle="Each project focuses on measurable impact, performance, and reliability."
      />
      <Projects />
    </div>
  );
};

export default ProjectsPage;
