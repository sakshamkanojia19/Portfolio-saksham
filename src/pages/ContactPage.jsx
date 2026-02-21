import Contact from "../components/Contact";
import PageHeader from "../components/PageHeader";

const ContactPage = () => {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Contact"
        title="Ready to ship AI automation that drives outcomes."
        subtitle="Share your goals and I will respond with a clear plan."
      />
      <Contact />
    </div>
  );
};

export default ContactPage;
