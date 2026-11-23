import Link from "next/link";
import { services, profile } from "../../lib/content";
import { metadata as pageMeta } from "../../lib/site";
import ContactForm from "../../components/ContactForm";
export const metadata = pageMeta(
  "Work with me",
  "Hire Saksham Kanojia for AI engineering, RAG assistants, voice agents, workflow automation, and full-stack AI products.",
  "/work-with-me",
);
export default function Work() {
  return (
    <div className="container">
      <div className="page-heading">
        <span className="eyebrow">OPEN TO THE RIGHT PROBLEMS</span>
        <h1>
          Your next idea.
          <br />
          <em>Let’s make it work.</em>
        </h1>
        <p>
          For founders building AI products, teams improving workflows,
          <br />
          and companies looking for an engineer who owns the outcome.
        </p>
      </div>
      <div className="service-grid">
        {services.map((s) => (
          <article key={s.title}>
            <span className="service-icon">✧</span>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
            <span className="service-tags">{s.tags}</span>
            <Link className="text-link" href={`/projects/${s.project}`}>
              See relevant work
            </Link>
          </article>
        ))}
      </div>
      <section className="contact-layout section">
        <div>
          <span className="eyebrow">START A CONVERSATION</span>
          <h2>
            Small team?
            <br />
            Big engineering problem?
          </h2>
          <p>
            Tell me about the problem, who it’s for, and what you need to move
            forward. We can discuss scope, fit, and a practical next step.
          </p>
          <div className="recruiter-note">
            <h3>Hiring for an AI engineering role?</h3>
            <p>
              Explore my project case studies and experience, or send the role
              and team context directly.
            </p>
            <a href="/resume.docx" download className="text-link">
              Download resume
            </a>
            <a href={profile.linkedin} className="text-link">
              Connect on LinkedIn
            </a>
          </div>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
