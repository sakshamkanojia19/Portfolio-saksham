import Contact from "../components/Contact";
import WorkWithMe from "../components/WorkWithMe";
import PageHeader from "../components/PageHeader";
import useDocumentMeta from "../hooks/useDocumentMeta";

const ContactPage = () => {
  useDocumentMeta(
    "Contact — Saksham Kanojia",
    "Get in touch to build AI automation, LLM agents, or AI-native SaaS products."
  );

  return (
    <div className="space-y-[var(--gap-section)]">
      <PageHeader
        eyebrow="Contact"
        title={["Tell me", "what's still", "manual."]}
        lede="The most useful first message is the boring one: what the workflow is, how often it runs, and roughly how many hours it eats. I'll come back with a plan and a timeline."
      />

      <Contact />
      <WorkWithMe />
    </div>
  );
};

export default ContactPage;
