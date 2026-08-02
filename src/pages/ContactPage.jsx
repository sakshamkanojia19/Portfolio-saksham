import Contact from "../components/Contact";
import PageHeader from "../components/PageHeader";
import useDocumentMeta from "../hooks/useDocumentMeta";

const ContactPage = () => {
  useDocumentMeta(
    "Contact — Saksham Kanojia",
    "Get in touch to build AI automation, LLM agents, or AI-native SaaS products."
  );

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Contact"
        title="Ready to ship AI automation that drives outcomes."
        subtitle="Share your goals and I will respond with a clear plan."
      />
      <Contact showHeading={false} />
    </div>
  );
};

export default ContactPage;
