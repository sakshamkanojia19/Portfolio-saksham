import Link from "next/link";
import Image from "next/image";
import { profile, projects } from "../lib/content";
import { getPosts } from "../lib/posts";
import { dateLabel, readingTime } from "../lib/site";
import { postPath } from "../lib/publication.mjs";
import ProjectCard from "../components/ProjectCard";
import NeuralField from "../components/motion/NeuralField";
import RoleTicker from "../components/motion/RoleTicker";
import AgentTrace from "../components/motion/AgentTrace";
import CountUp from "../components/motion/CountUp";
import Capabilities from "../components/home/Capabilities";
import StackMarquee from "../components/home/StackMarquee";
import Timeline from "../components/home/Timeline";
import Toolkit from "../components/home/Toolkit";

export const dynamic = "force-dynamic";

const STATS = [
  ["5+", "internal SaaS platforms shipped to production"],
  ["250+", "clients covered by daily LLM audits"],
  ["~60%", "estimated reduction in manual ops*"],
  ["~1s", "time to first token in the Nexus voice loop"],
];

const PROCESS = [
  [
    "Understand the workflow",
    "Who uses it, what breaks today, and what “working” means — before any model is chosen.",
  ],
  [
    "Design the boundaries",
    "Permissions, latency, cost, and failure modes are architecture decisions, not afterthoughts.",
  ],
  [
    "Ship end to end",
    "Backend, retrieval, interface, and deployment — one owner across the whole path.",
  ],
  [
    "Measure and harden",
    "Regression tests, observability, and the awkward edge cases that only show up with real users.",
  ],
];

function SectionHead({ index, eyebrow, title, children, action }) {
  return (
    <div className="sec-head" data-reveal>
      <div>
        <span className="eyebrow">
          <span className="eyebrow-index">{index}</span> {eyebrow}
        </span>
        <h2>{title}</h2>
      </div>
      {(children || action) && (
        <div className="sec-head-side">
          {children && <p>{children}</p>}
          {action}
        </div>
      )}
    </div>
  );
}

export default async function Home() {
  const { posts } = await getPosts();
  return (
    <div className="home">
      <section className="hero2">
        <NeuralField />
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="container hero2-grid">
          <div className="hero2-copy">
            <div className="availability" data-reveal>
              <span className="pulse" /> Open to AI engineering roles &amp;
              select projects
            </div>
            <p className="hero-kicker" data-reveal style={{ "--d": 1 }}>
              Hi, I’m Saksham — AI engineer in Delhi.
            </p>
            <h1 data-reveal style={{ "--d": 2 }}>
              I build AI that <span className="h-accent">works in the</span>{" "}
              <br className="h1-break" />
              <span className="h-accent serif">real world.</span>
            </h1>
            <p className="hero-ticker" data-reveal style={{ "--d": 3 }}>
              <span className="ticker-label">Shipping</span>
              <RoleTicker />
            </p>
            <p className="hero-lede" data-reveal style={{ "--d": 4 }}>
              From permission-aware RAG to real-time voice agents, I take AI
              systems from the first architecture sketch to production — and
              share what I learn along the way.
            </p>
            <div className="hero-actions" data-reveal style={{ "--d": 5 }}>
              <Link className="button primary" href="/projects">
                Explore my work <span className="btn-arrow">→</span>
              </Link>
              <Link className="button secondary" href="/work-with-me">
                Let’s work together
              </Link>
            </div>
            <ul className="hero-links" data-reveal style={{ "--d": 6 }}>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href="/resume.docx" download>
                  Resume ↓
                </a>
              </li>
            </ul>
          </div>

          <div className="hero2-visual" data-reveal style={{ "--d": 3 }}>
            <div className="portrait-card">
              <div className="portrait-inner">
                <Image
                  src="/portrait.webp"
                  alt="Saksham Kanojia"
                  width={640}
                  height={800}
                  priority
                  className="portrait2"
                />
                <div className="portrait-shade" />
              </div>
            </div>
            <span className="orbit-chip c1" aria-hidden="true">
              ✧ RAG
            </span>
            <span className="orbit-chip c2" aria-hidden="true">
              ◉ Voice AI
            </span>
            <span className="orbit-chip c3" aria-hidden="true">
              ⌘ Agents
            </span>
            <AgentTrace />
          </div>
        </div>
        <a className="scroll-cue" href="#proof" aria-label="Scroll to highlights">
          <span />
        </a>
      </section>

      <section id="proof" className="container stats" aria-label="Highlights">
        {STATS.map(([value, label], i) => (
          <div className="stat" key={label} data-reveal style={{ "--d": i }}>
            <strong>
              <CountUp value={value} />
            </strong>
            <span>{label}</span>
          </div>
        ))}
        <p className="stats-note">
          *Directional estimate, validated with leadership.
        </p>
      </section>

      <StackMarquee />

      <section className="container section" aria-labelledby="build-heading">
        <SectionHead
          index="01"
          eyebrow="WHAT I BUILD"
          title={
            <span id="build-heading">
              Systems that survive <em className="serif">real users.</em>
            </span>
          }
        >
          Five areas I work across every week — from the first voice packet to
          the last deploy.
        </SectionHead>
        <Capabilities />
      </section>

      <section
        id="work"
        className="container section"
        aria-labelledby="work-heading"
      >
        <SectionHead
          index="02"
          eyebrow="SELECTED WORK"
          title={
            <span id="work-heading">
              Built to solve. <em className="serif">Engineered to last.</em>
            </span>
          }
          action={
            <Link className="text-link" href="/projects">
              All case studies →
            </Link>
          }
        />
        <div className="work-list">
          {projects.map((p, i) => (
            <ProjectCard project={p} index={i} key={p.slug} />
          ))}
        </div>
      </section>

      <section
        className="container section split-section"
        aria-labelledby="exp-heading"
      >
        <div className="split-intro">
          <SectionHead
            index="03"
            eyebrow="EXPERIENCE"
            title={
              <span id="exp-heading">
                An engineer who owns <em className="serif">the whole problem.</em>
              </span>
            }
          />
          <p data-reveal>
            At Digital Web Solutions I build AI and internal platforms across
            operations, client intelligence, and voice — architecture, backend,
            interfaces, and deployment.
          </p>
          <Link className="text-link" href="/about#experience" data-reveal>
            Full experience →
          </Link>
        </div>
        <Timeline limit={3} />
      </section>

      <section
        id="toolkit"
        className="container section"
        aria-labelledby="toolkit-heading"
      >
        <SectionHead
          index="04"
          eyebrow="THE TOOLKIT"
          title={
            <span id="toolkit-heading">
              Tools, <em className="serif">with a purpose.</em>
            </span>
          }
        >
          The stack I reach for in production, grouped by the problems it
          solves.
        </SectionHead>
        <Toolkit />
      </section>

      <section className="container section" aria-labelledby="process-heading">
        <SectionHead
          index="05"
          eyebrow="HOW I WORK"
          title={
            <span id="process-heading">
              What happens <em className="serif">after the demo.</em>
            </span>
          }
        />
        <ol className="process">
          {PROCESS.map(([title, text], i) => (
            <li key={title} data-reveal style={{ "--d": i }}>
              <span className="process-num">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {posts.length > 0 && (
        <section
          className="container section latest-posts"
          aria-labelledby="latest-heading"
        >
          <SectionHead
            index="06"
            eyebrow="LATEST POSTS"
            title={
              <span id="latest-heading">
                Notes <em className="serif">from the build.</em>
              </span>
            }
            action={
              <Link className="text-link" href="/posts">
                All posts →
              </Link>
            }
          />
          <ol className="post-grid">
            {posts.slice(0, 3).map((p, i) => (
              <li key={p.id} data-reveal style={{ "--d": i }}>
                <Link className="post-tile spotlight" href={postPath(p)}>
                  <span className="post-tile-meta">
                    <time dateTime={p.published_at}>
                      {dateLabel(p.published_at)}
                    </time>
                    · {readingTime(p.body)} min ·{" "}
                    {p.kind === "note" ? "Short post" : "Article"}
                  </span>
                  <h3>{p.title}</h3>
                  {p.excerpt && <p>{p.excerpt}</p>}
                  <span className="post-tile-go" aria-hidden="true">
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="container cta2-wrap">
        <div className="cta2" data-reveal>
          <div className="cta2-inner">
            <span className="eyebrow">GOOD WORK STARTS WITH A CONVERSATION</span>
            <h2>
              Building something <em className="serif">that should exist?</em>
            </h2>
            <p>
              I’m open to AI engineering roles and focused freelance projects —
              RAG assistants, voice systems, agents, and AI products.
            </p>
            <div className="hero-actions cta2-actions">
              <Link className="button primary" href="/work-with-me">
                Tell me what you’re building <span className="btn-arrow">→</span>
              </Link>
              <a className="button secondary" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
