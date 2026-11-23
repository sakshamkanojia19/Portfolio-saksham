import Image from "next/image";
import Link from "next/link";
import { experience, skills } from "../../lib/content";
import { metadata as pageMeta, jsonLd, siteUrl } from "../../lib/site";
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
      <section
        className="profile-answers section"
        aria-labelledby="profile-answers"
      >
        <span className="eyebrow">QUICK ANSWERS</span>
        <h2 id="profile-answers">Working with Saksham.</h2>
        <dl>
          <div>
            <dt>Who is Saksham Kanojia?</dt>
            <dd>
              Saksham Kanojia is an AI engineer based in Delhi, India, working
              on production GenAI systems at Digital Web Solutions. His work
              spans retrieval-augmented generation, agentic workflows, voice AI,
              and full-stack applications.
            </dd>
          </div>
          <div>
            <dt>What has he built?</dt>
            <dd>
              His projects include{" "}
              <Link href="/projects/nexus">
                Nexus, a real-time voice RAG assistant
              </Link>
              , and{" "}
              <Link href="/projects/collabdocs">
                CollabDocs, a permission-aware document workspace
              </Link>
              . The case studies explain their architecture, decisions, and
              reported results.
            </dd>
          </div>
          <div>
            <dt>Is he available for roles and freelance work?</dt>
            <dd>
              Yes. Saksham is open to AI engineering roles and select freelance
              projects involving RAG assistants, voice systems, workflow
              automation, and AI product development.{" "}
              <Link href="/work-with-me">Share a role or project</Link> to
              discuss fit.
            </dd>
          </div>
          <div>
            <dt>Where does he share engineering knowledge?</dt>
            <dd>
              Read his <Link href="/posts">short posts</Link> for quick thoughts
              and updates, or explore{" "}
              <Link href="/writing">longer technical articles</Link>. Both are
              public and can be followed through RSS.
            </dd>
          </div>
        </dl>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": `${siteUrl}/about#page`,
            url: `${siteUrl}/about`,
            name: "About Saksham Kanojia — AI Engineer",
            mainEntity: { "@id": `${siteUrl}/#person` },
            isPartOf: { "@id": `${siteUrl}/#website` },
          }),
        }}
      />
      <div className="inline-cta">
        <h2>Let’s build something useful.</h2>
        <Link className="button primary" href="/work-with-me">
          Get in touch
        </Link>
      </div>
    </div>
  );
}
