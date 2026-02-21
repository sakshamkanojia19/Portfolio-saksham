import About from "../components/About";
import PageHeader from "../components/PageHeader";

const AboutPage = () => {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="About"
        title="AI automation engineer focused on measurable outcomes."
        subtitle="I design and deploy LLM-powered systems, intelligent workflows, and scalable services that reduce manual work and improve decision making."
      />
      <About />
    </div>
  );
};

export default AboutPage;
