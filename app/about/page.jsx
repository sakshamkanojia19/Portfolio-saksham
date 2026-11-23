import Image from "next/image";
import Link from "next/link";
import { experience, skills } from "../../lib/content";
import { metadata as pageMeta } from "../../lib/site";
export const metadata = pageMeta(
  "About",
  "Meet Saksham Kanojia, a Delhi-based AI engineer building production GenAI, RAG, voice agents, and full-stack systems.",
  "/about",
);
export default function About() {
  return (
    <div className="container">
      <section className="about-heading page-heading">
        <div>
          <span className="eyebrow">THE PERSON BEHIND THE SYSTEMS</span>
          <h1>
            Curious by default.
            <br />
            <em>Engineer by practice.</em>
          </h1>
          <p>
            I’m Saksham, an AI engineer based in Delhi. I build production GenAI
            systems with FastAPI and React, spanning retrieval, agentic
            workflows, and real-time voice.
          </p>
          <p>
            I like owning a problem through the whole journey: understanding the
            workflow, choosing the architecture, shipping, and making it better
            once people use it.
          </p>
          <a className="button secondary" href="/resume.docx" download>
            Download my resume · DOCX
          </a>
        </div>
        <Image
          src="/portrait.webp"
          alt="Saksham Kanojia"
          width={400}
          height={500}
          className="about-portrait"
        />
      </section>
      <section id="experience" className="section">
        <span className="eyebrow">EXPERIENCE</span>
        <h2>Where the work happens.</h2>
        <div className="experience-list">
          {experience.map((e) => (
            <article className="experience-row" key={e.company}>
              <div>
                <span className="mono">{e.period}</span>
                <h3>{e.company}</h3>
                <p>{e.role}</p>
              </div>
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section id="toolkit" className="section">
        <span className="eyebrow">THE TOOLKIT</span>
        <h2>Tools, with a purpose.</h2>
        <div className="skills-list">
          {skills.map(([name, tools]) => (
            <div key={name}>
              <h3>{name}</h3>
              <p>{tools}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="education section">
        <div>
          <span className="eyebrow">EDUCATION</span>
          <h3>B.Tech, Information Technology</h3>
          <p>Maharaja Surajmal Institute of Technology, New Delhi</p>
          <span className="mono">Nov 2020 — Jun 2024 · 8.7 CGPA</span>
        </div>
        <div>
          <span className="eyebrow">CERTIFICATIONS</span>
          <h3>OCI Generative AI Certified</h3>
          <p>Oracle</p>
          <h3>Docker Essentials</h3>
          <p>Udemy</p>
        </div>
      </section>
      <div className="inline-cta">
        <h2>Let’s build something useful.</h2>
        <Link className="button primary" href="/work-with-me">
          Get in touch
        </Link>
      </div>
    </div>
  );
}
