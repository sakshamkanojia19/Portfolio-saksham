import Image from "next/image";
import Link from "next/link";
import Timeline from "../../components/home/Timeline";
import Toolkit from "../../components/home/Toolkit";
import SectionHead from "../../components/SectionHead";
import { facts } from "../../lib/content";
import { metadata as pageMeta, jsonLd, siteUrl } from "../../lib/site";
export const metadata = pageMeta(
  "About",
  "Meet Saksham Kanojia, a Delhi-based AI engineer building production GenAI, RAG, voice agents, and full-stack systems.",
  "/about",
);
const QA = [
  {
    q: "Who is Saksham Kanojia?",
    a: "Saksham Kanojia is an AI engineer based in Delhi, India, working on production GenAI systems at Digital Web Solutions. His work spans retrieval-augmented generation, agentic workflows, voice AI, and full-stack applications.",
    link: ["/about#experience", "See the experience"],
  },
  {
    q: "What has he built?",
    a: "His projects include Nexus, a real-time voice RAG assistant, and CollabDocs, a permission-aware collaborative document workspace. The case studies explain their architecture, decisions, and reported results.",
    link: ["/projects", "Read the case studies"],
  },
  {
    q: "Is he available for roles and freelance work?",
    a: "Yes. Saksham is open to AI engineering roles and select freelance projects involving RAG assistants, voice systems, workflow automation, and AI product development.",
    link: ["/work-with-me", "Share a role or project"],
  },
  {
    q: "Where does he share engineering knowledge?",
    a: "He publishes short posts with quick thoughts and updates, and longer technical articles on building AI systems. Both are public and can be followed by email or RSS.",
    link: ["/posts", "Read the posts"],
  },
];
export default function About() {
  return (
    <div className="container">
      <section className="about-heading page-heading" data-reveal>
        <div>
          <span className="eyebrow">About</span>
          <h1>
            Curious by default. <em>Engineer by practice.</em>
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
          <div className="hero-actions">
            <a className="button primary" href="/resume.docx" download>
              Download resume ↓
            </a>
            <Link className="button ghost" href="/work-with-me">
              Work with me
            </Link>
          </div>
        </div>
        <figure className="card portrait">
          <Image
            src="/portrait.webp"
            alt="Saksham Kanojia"
            width={400}
            height={500}
            priority
          />
          <figcaption>
            {facts.slice(1, 4).map(([k, v]) => (
              <span key={k}>
                <b>{k}</b> {v}
              </span>
            ))}
          </figcaption>
        </figure>
      </section>
      <section id="experience" className="section" aria-labelledby="exp-h">
        <SectionHead
          index="01"
          label="Experience"
          id="exp-h"
          title="Where the work happens."
        />
        <Timeline detailed />
      </section>
      <section id="toolkit" className="section" aria-labelledby="tool-h">
        <SectionHead
          index="02"
          label="Toolkit"
          id="tool-h"
          title="Tools, with a purpose."
        />
        <Toolkit />
      </section>
      <section className="section" aria-labelledby="profile-answers">
        <SectionHead
          index="03"
          label="Quick answers"
          id="profile-answers"
          title="Working with Saksham."
        />
        <dl className="qa">
          {QA.map(({ q, a, link: [href, label] }) => (
            <div key={q} data-reveal>
              <dt>{q}</dt>
              <dd>
                {a} <Link href={href}>{label} →</Link>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="card cta">
        <div>
          <h2>Let’s build something useful.</h2>
          <p>Roles, freelance projects, or a problem worth a conversation.</p>
        </div>
        <div className="hero-actions">
          <Link className="button primary" href="/work-with-me">
            Get in touch
          </Link>
        </div>
      </div>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: QA.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
    </div>
  );
}
