import Image from "next/image";
import Link from "next/link";
import { profile, projects } from "../lib/content";
import { getPosts } from "../lib/posts";
import { dateLabel, readingTime } from "../lib/site";
import { postPath, plainSummary } from "../lib/publication.mjs";
import HeroField from "../components/home/HeroField";
import RotatingText from "../components/home/RotatingText";
import Timeline from "../components/home/Timeline";
import ProjectCard from "../components/ProjectCard";
import SectionHead from "../components/SectionHead";
import CountUp from "../components/motion/CountUp";
import { HeroMotion, HeroLayer } from "../components/motion/HeroMotion";

export const dynamic = "force-dynamic";

const BUILDING = [
  "enterprise voice agents",
  "permission-aware RAG",
  "agentic workflows",
  "internal SaaS platforms",
];
const STATS = [
  ["~1s", "time to first token in Nexus voice"],
  ["250+", "clients covered by daily LLM audits"],
  ["5+", "internal SaaS platforms shipped"],
];

function excerptOf(post) {
  const text = post.kind === "note" ? plainSummary(post.body) : post.excerpt;
  return text.length > 200 ? `${text.slice(0, 200).trimEnd()}…` : text;
}

export default async function Home() {
  const { posts } = await getPosts();
  const latest = posts.slice(0, 3);

  return (
    <div className="home">
      <HeroMotion>
        <HeroLayer layer="background" className="hero-depth-field"><HeroField /></HeroLayer>
        <div className="container hero-inner">
          <div className="hero-grid">
            <div className="hero-copy" data-hero-enter>
              <p className="status">
                <span className="status-dot" aria-hidden="true" /> open to
                roles &amp; projects
              </p>
              <h1 id="hero-heading">
                Saksham <span className="grad-text">Kanojia</span>
              </h1>
              <p className="hero-role">
                AI Engineer · RAG · Voice agents · Agentic workflows
              </p>
              <p className="hero-lede">
                I build AI-native products and automation systems with LLMs,
                RAG pipelines, and scalable SaaS — engineered end to end and
                measured in production.
              </p>
              <p className="hero-building">
                <span aria-hidden="true">&gt; </span>currently building{" "}
                <RotatingText items={BUILDING} />
              </p>
              <div className="hero-actions">
                <Link className="button primary" href="#systems">
                  View my work
                </Link>
                <Link className="button" href="/work-with-me">
                  Get in touch
                </Link>
              </div>
              <p className="hero-social">
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="/resume.docx" download>Resume</a>
                <span>{profile.location}</span>
              </p>
            </div>
            <HeroLayer layer="portrait" className="hero-portrait">
              <span className="portrait-glow" aria-hidden="true" />
              <Image
                src="/portrait.webp"
                alt="Portrait of Saksham Kanojia"
                width={340}
                height={340}
                priority
              />
            </HeroLayer>
          </div>
          <dl className="stats" data-reveal>
            {STATS.map(([value, label], index) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd className="grad-text"><CountUp value={value} delay={index * 0.12} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </HeroMotion>

      <section id="systems" className="section container" aria-labelledby="systems-heading">
        <SectionHead
          index="01"
          label="Projects"
          id="systems-heading"
          title="Selected work."
          note="Voice, retrieval, and automation. A few problems I've taken from idea to working software."
          aside={
            <Link className="text-link" href="/projects">
              All case studies
            </Link>
          }
        />
        <div className="project-grid">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
            />
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="exp-heading">
        <SectionHead
          index="03"
          label="Experience"
          id="exp-heading"
          title="Where I've been building."
          aside={
            <Link className="text-link" href="/about#experience">
              More about me
            </Link>
          }
        />
        <Timeline />
      </section>

      <section className="section writing-band" aria-labelledby="notebook-heading">
        <div className="container">
        <SectionHead
          index="02"
          label="Notebook"
          id="notebook-heading"
          title="Notes from the work."
          aside={
            <Link className="text-link" href="/posts">
              All posts
            </Link>
          }
        />
        <div className="notebook">
          <ol className="feed">
            {latest.map((p) => (
              <li key={p.id} data-reveal>
                <Link className="card feed-item" href={postPath(p)}>
                  <span className="feed-meta">
                    <span className="pill">
                      {p.kind === "note" ? "Post" : "Article"}
                    </span>
                    <time dateTime={p.published_at}>
                      {dateLabel(p.published_at)}
                    </time>
                    {p.kind !== "note" && <span>{readingTime(p.body)} min read</span>}
                  </span>
                  {p.kind !== "note" && <strong>{p.title}</strong>}
                  <span className="feed-text">{excerptOf(p)}</span>
                </Link>
              </li>
            ))}
            {!latest.length && (
              <li className="card feed-empty">
                First posts are on the way — subscribe to get them by email.
              </li>
            )}
          </ol>
          <aside className="card notebook-aside" data-reveal>
            <h3>Stay curious.</h3>
            <p>Experiments, lessons, and things I learn while building. Follow by email or RSS.</p>
            <Link className="text-link" href="/subscribe">Follow updates</Link>
          </aside>
        </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="cta-heading">
        <div className="card cta" data-reveal>
          <p className="eyebrow">let’s build</p>
          <h2 id="cta-heading">
            Have an AI problem <span className="grad-text">worth solving?</span>
          </h2>
          <p>
            Open to AI engineering roles and focused freelance projects — RAG
            assistants, voice agents, automation, and AI products.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/work-with-me">
              Let&apos;s talk
            </Link>
            <a className="button" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
