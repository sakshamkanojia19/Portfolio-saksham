import Link from "next/link";
import Image from "next/image";
import { profile, projects } from "../lib/content";
import { getPosts } from "../lib/posts";
import { dateLabel } from "../lib/site";
import ProjectCard from "../components/ProjectCard";
export const dynamic = "force-dynamic";
export default async function Home() {
  const { posts } = await getPosts();
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-copy">
          <div className="availability">
            <span /> Open to roles & select projects
          </div>
          <p className="hero-intro">Hi, I’m Saksham.</p>
          <h1>
            I build AI that
            <br />
            <em>works in the real world.</em>
          </h1>
          <p className="hero-description">
            From permission-aware RAG to real-time voice agents.
            <br className="desktop-break" /> I take AI systems from the first
            architecture sketch
            <br className="desktop-break" /> to production—and share what I
            learn along the way.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/projects">
              Explore my work
            </Link>
            <Link className="button secondary" href="/work-with-me">
              Let’s work together
            </Link>
          </div>
          <div className="hero-social">
            <span>BASED IN DELHI, INDIA</span>
            <i />
            <a href={profile.github}>GitHub</a>
            <a href={profile.linkedin}>LinkedIn</a>
            <a href="/resume.docx" download>
              Resume
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-frame">
            <Image
              src="/portrait.webp"
              alt="Saksham Kanojia"
              width={640}
              height={800}
              priority
              className="portrait"
            />
            <div className="portrait-gradient" />
            <div className="portrait-caption">
              <span>ENGINEERING, END TO END</span>
              <strong>Curiosity → systems → impact.</strong>
            </div>
          </div>
          <div className="floating-note">
            <span className="note-symbol">✧</span>
            <div>
              <span>CURRENTLY BUILDING</span>
              <strong>Voice that feels human.</strong>
            </div>
          </div>
          <span className="visual-coordinate">
            28.6139° N &nbsp; 77.2090° E
          </span>
        </div>
      </section>
      <section className="proof-strip" aria-label="Experience highlights">
        <div>
          <strong>5+</strong>
          <span>internal SaaS platforms shipped</span>
        </div>
        <div>
          <strong>250+</strong>
          <span>clients covered by daily LLM audits</span>
        </div>
        <div>
          <strong>~60%</strong>
          <span>estimated reduction in manual ops*</span>
        </div>
        <p>
          *Directional estimate,
          <br />
          validated with leadership.
        </p>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SELECTED WORK</span>
            <h2>
              Built to solve.
              <br className="mobile-only" /> Engineered to last.
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            All projects
          </Link>
        </div>
        <div className="project-grid">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard project={p} key={p.slug} />
          ))}
        </div>
      </section>
      <section className="workbench section">
        <div className="workbench-intro">
          <span className="eyebrow">
            {posts.length ? "WRITING & FIELD NOTES" : "FROM THE WORKBENCH"}
          </span>
          <h2>
            The thinking <br />
            behind the build.
          </h2>
          <p>
            Practical lessons in retrieval, voice, and engineering AI systems
            people can use.
          </p>
          <Link className="text-link" href="/writing">
            Visit the notebook
          </Link>
        </div>
        <div className="note-list">
          {posts.length
            ? posts.slice(0, 3).map((p) => (
                <Link
                  className="note-item"
                  key={p.id}
                  href={`/writing/${p.slug}`}
                >
                  <span>
                    {p.tags?.[0] || "ENGINEERING"} · {dateLabel(p.published_at)}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </Link>
              ))
            : [
                [
                  "nexus",
                  "VOICE AI",
                  "When a pause isn’t the end of a sentence",
                  "Inside Nexus: endpointing, barge-in, and the engineering of conversation.",
                ],
                [
                  "collabdocs",
                  "RETRIEVAL",
                  "Permissions belong before generation",
                  "How CollabDocs keeps retrieval inside the user’s access boundary.",
                ],
                [
                  "lead-intelligence-agent",
                  "AGENTIC SYSTEMS",
                  "Good outreach starts with good context",
                  "A look at the research pipeline behind Lead Intelligence.",
                ],
              ].map(([slug, tag, title, desc]) => (
                <Link
                  className="note-item"
                  href={`/projects/${slug}`}
                  key={slug}
                >
                  <span>{tag} · PROJECT NOTE</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </Link>
              ))}
        </div>
      </section>
      <section className="about-teaser section">
        <div className="eyebrow">A LITTLE CONTEXT</div>
        <div>
          <h2>
            An engineer who owns
            <br />
            the whole problem.
          </h2>
          <p>
            At Digital Web Solutions, I build AI and internal platforms across
            operations, client intelligence, and voice. My work spans
            architecture, backend systems, interfaces, and deployment.
          </p>
          <p>
            I care about what happens after the demo: permissions, latency,
            cost, and the awkward edge cases.
          </p>
          <Link className="text-link" href="/about">
            More about me
          </Link>
        </div>
      </section>
      <section className="cta-panel">
        <span className="eyebrow">GOOD WORK STARTS WITH A CONVERSATION</span>
        <h2>
          Building something
          <br />
          <em>that should exist?</em>
        </h2>
        <p>I’m open to AI engineering roles and focused freelance projects.</p>
        <Link className="button primary" href="/work-with-me">
          Tell me what you’re building
        </Link>
        <a className="cta-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </section>
    </div>
  );
}
