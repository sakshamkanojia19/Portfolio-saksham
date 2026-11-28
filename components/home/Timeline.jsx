import { experience, education } from "../../lib/content";

const STACKS = {
  "Digital Web Solutions":
    "Pipecat · Plivo · LangChain · Pinecone · n8n · MCP · AWS · GCP",
  "Unified Mentor": "React · FastAPI · Node.js · MongoDB · Docker",
};

// Keep the homepage focused on roles; education and full details live on About.
export default function Timeline({ detailed = false }) {
  return (
    <div className="ledger">
      <div className="ledger-group">
        <p className="ledger-kind">Roles</p>
        <ol>
          {experience.map((e, i) => (
            <li className="ledger-row" key={e.company} data-reveal>
              <span className="ledger-date">
                {e.period}
                {i === 0 && <span className="pill">now</span>}
              </span>
              <div className="ledger-what">
                <h3>{e.role}</h3>
                <p>{e.company}</p>
              </div>
              <div className="ledger-impact">
                <ul>
                  {(detailed ? e.points : e.impact).map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {detailed && STACKS[e.company] && (
                  <span className="mono-tags">{STACKS[e.company]}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
      {detailed && <div className="ledger-group">
        <p className="ledger-kind">Education</p>
        <ol>
          <li className="ledger-row" data-reveal>
            <span className="ledger-date">{education.period}</span>
            <div className="ledger-what">
              <h3>{education.degree}</h3>
              <p>{education.school}</p>
            </div>
            <div className="ledger-impact">
              <ul>
                <li>{education.grade}</li>
                {education.certifications.map(([name, by]) => (
                  <li key={name}>
                    {name} — {by}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ol>
      </div>}
    </div>
  );
}
