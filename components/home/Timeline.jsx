import { experience } from "../../lib/content";

const STACKS = {
  "Digital Web Solutions": [
    "Pipecat",
    "Plivo",
    "LangChain",
    "Pinecone",
    "n8n",
    "MCP",
    "AWS",
    "GCP",
  ],
  "Unified Mentor": ["React", "FastAPI", "Node.js", "MongoDB", "Docker"],
};

// Vertical career timeline. `limit` trims the bullet list on the home page.
export default function Timeline({ limit }) {
  return (
    <ol className="timeline">
      {experience.map((e, i) => (
        <li
          className="tl-item"
          key={e.company}
          data-reveal
          style={{ "--d": i }}
        >
          <span className={`tl-dot${i === 0 ? " now" : ""}`} aria-hidden="true" />
          <div className="tl-meta">
            <span className="mono">{e.period}</span>
            {i === 0 && <span className="tl-badge">Current</span>}
          </div>
          <div className="tl-card spotlight">
            <h3>{e.role}</h3>
            <p className="tl-company">{e.company}</p>
            <ul>
              {(limit ? e.points.slice(0, limit) : e.points).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {STACKS[e.company] && (
              <div className="chip-row">
                {STACKS[e.company].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
