import Link from "next/link";

// Bento grid of what Saksham builds. Each card carries a small animated,
// illustrative visual (pure CSS/SVG, no client JS).

function VoiceViz() {
  return (
    <div className="viz viz-voice" aria-hidden="true">
      <div className="viz-wave">
        {Array.from({ length: 44 }, (_, i) => (
          <i
            key={i}
            style={{
              "--i": i,
              "--h": `${18 + Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.27)) * 82}%`,
            }}
          />
        ))}
      </div>
      <div className="viz-voice-meta">
        <span className="chip-live">● listening</span>
        <span>EN / HI</span>
        <span>barge-in ✓</span>
        <span>endpointing ✓</span>
      </div>
    </div>
  );
}

function RagViz() {
  const docs = [
    ["contracts/acme-2026.pdf", "0.92", true],
    ["crm/acme-account.md", "0.87", true],
    ["finance/board-deck.pdf", "", false],
    ["support/thread-1142", "0.71", true],
  ];
  return (
    <div className="viz viz-rag" aria-hidden="true">
      <div className="rag-query">
        <span>⌕</span> renewal terms for Acme?
        <em>role: sales</em>
      </div>
      <ul>
        {docs.map(([name, score, ok], i) => (
          <li key={name} className={ok ? "ok" : "blocked"} style={{ "--i": i }}>
            <span className="rag-file">{name}</span>
            {ok ? (
              <span className="rag-score">
                <b style={{ "--s": score }} />
                {score}
              </span>
            ) : (
              <span className="rag-block">filtered before ranking</span>
            )}
          </li>
        ))}
      </ul>
      <div className="rag-answer">
        ✧ Answer with citations <span>[1]</span>
        <span>[2]</span>
        <span>[4]</span>
      </div>
    </div>
  );
}

function AgentViz() {
  return (
    <svg
      className="viz viz-agents"
      viewBox="0 0 320 170"
      role="presentation"
      aria-hidden="true"
    >
      <g className="edges">
        <path d="M62 85 H112" />
        <path d="M168 85 C190 85 190 40 212 40" />
        <path d="M168 85 C190 85 190 130 212 130" />
        <path d="M262 40 C282 40 280 85 290 85" />
        <path d="M262 130 C282 130 280 85 290 85" />
      </g>
      <g className="edges flow">
        <path d="M62 85 H112" />
        <path d="M168 85 C190 85 190 40 212 40" />
        <path d="M168 85 C190 85 190 130 212 130" />
        <path d="M262 40 C282 40 280 85 290 85" />
        <path d="M262 130 C282 130 280 85 290 85" />
      </g>
      {[
        [8, 70, 54, "ICP"],
        [112, 70, 56, "plan"],
        [212, 25, 50, "scrape"],
        [212, 115, 50, "LLM"],
      ].map(([x, y, w, label]) => (
        <g key={label} className="node">
          <rect x={x} y={y} width={w} height="30" rx="8" />
          <text x={x + w / 2} y={y + 19}>
            {label}
          </text>
        </g>
      ))}
      <g className="node accent">
        <circle cx="298" cy="85" r="14" />
        <text x="298" y="89">
          ✓
        </text>
      </g>
    </svg>
  );
}

function PlatformViz() {
  return (
    <div className="viz viz-app" aria-hidden="true">
      <div className="app-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="app-body">
        <div className="app-side">
          <span className="on" />
          <span />
          <span />
          <span />
        </div>
        <div className="app-main">
          {["synced", "review", "synced"].map((s, i) => (
            <div className="app-row" key={i} style={{ "--i": i }}>
              <span />
              <b className={s}>{s}</b>
            </div>
          ))}
          <div className="app-roles">
            <em>admin</em>
            <em>manager</em>
            <em>employee</em>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShipViz() {
  return (
    <div className="viz viz-ship" aria-hidden="true">
      <svg viewBox="0 0 300 90" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ship-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="area"
          d="M0 70 L30 62 L60 66 L90 48 L120 54 L150 38 L180 42 L210 28 L240 32 L270 18 L300 22 L300 90 L0 90 Z"
          fill="url(#ship-fill)"
        />
        <path
          className="line"
          d="M0 70 L30 62 L60 66 L90 48 L120 54 L150 38 L180 42 L210 28 L240 32 L270 18 L300 22"
        />
      </svg>
      <div className="ship-log">
        <span>
          <b>✓</b> regression suite
        </span>
        <span>
          <b>✓</b> docker build
        </span>
        <span>
          <b>✓</b> deploy · cloud run
        </span>
      </div>
    </div>
  );
}

const CARDS = [
  {
    key: "voice",
    size: "half",
    label: "01 · VOICE AI",
    title: "Real-time voice agents",
    text: "Turn-taking that waits for the end of a thought, handles interruptions, and works in Hinglish and English — wired to outcomes, costs, and guardrails.",
    tags: ["Pipecat", "Sarvam AI", "Cartesia", "faster-whisper"],
    href: "/projects/nexus",
    Viz: VoiceViz,
  },
  {
    key: "rag",
    size: "half",
    label: "02 · RETRIEVAL",
    title: "Permission-aware RAG",
    text: "Access control lives inside the query, before ranking — so answers stay grounded, cited, and inside the user’s boundary.",
    tags: ["LangChain", "Qdrant", "Pinecone", "MongoDB"],
    href: "/projects/collabdocs",
    Viz: RagViz,
  },
  {
    key: "agents",
    size: "third",
    label: "03 · AGENTS",
    title: "Agentic workflows",
    text: "Research, tools, and summarisation chained into pipelines with clear boundaries and a human review step.",
    tags: ["LangGraph", "MCP", "n8n"],
    href: "/projects/lead-intelligence-agent",
    Viz: AgentViz,
  },
  {
    key: "platforms",
    size: "third",
    label: "04 · PLATFORMS",
    title: "Internal SaaS, shipped",
    text: "5+ internal platforms with real-time sync, RBAC, and human-reviewed workflows like payroll.",
    tags: ["React", "Node.js", "FastAPI"],
    href: "/about#experience",
    Viz: PlatformViz,
  },
  {
    key: "ship",
    size: "third",
    label: "05 · PRODUCTION",
    title: "Built past the demo",
    text: "Tests, observability, cost tracking, and deploys on AWS and GCP — the unglamorous parts that keep AI working.",
    tags: ["AWS", "GCP", "Docker", "CI/CD"],
    href: "/about#toolkit",
    Viz: ShipViz,
  },
];

export default function Capabilities() {
  return (
    <div className="bento">
      {CARDS.map(({ key, size, label, title, text, tags, href, Viz }, i) => (
        <Link
          key={key}
          href={href}
          className={`bento-card spotlight ${size} bento-${key}`}
          data-reveal
          style={{ "--d": i % 3 }}
        >
          <Viz />
          <div className="bento-copy">
            <span className="bento-label">{label}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="chip-row">
              {tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <span className="bento-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
