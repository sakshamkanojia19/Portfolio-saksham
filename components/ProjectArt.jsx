export default function ProjectArt({ kind, compact = false }) {
  if (kind === "nexus")
    return (
      <div
        className={`project-art nexus-art ${compact ? "compact" : ""}`}
        aria-label="Nexus voice pipeline illustration"
      >
        <div className="art-toolbar">
          <span>NEXUS / VOICE INTERFACE</span>
          <span className="art-label">SYSTEM OVERVIEW</span>
        </div>
        <div className="voice-orb">
          <div className="waveform">
            {Array.from({ length: 33 }, (_, i) => (
              <i
                key={i}
                style={{
                  height: `${14 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.32)) * 65}px`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="art-caption">A conversation, without the friction.</div>
        <div className="pipeline">
          <span>Listen</span>
          <i />
          <span>Retrieve</span>
          <i />
          <span>Respond</span>
        </div>
      </div>
    );
  if (kind === "collabdocs")
    return (
      <div
        className={`project-art docs-art ${compact ? "compact" : ""}`}
        aria-label="CollabDocs permission-aware retrieval illustration"
      >
        <div className="art-toolbar">
          <span>COLLABDOCS / WORKSPACE</span>
          <span className="art-label">SYSTEM OVERVIEW</span>
        </div>
        <div className="doc-scene">
          <div className="doc-paper">
            <span className="mini-label">TEAM KNOWLEDGE</span>
            <strong>
              A shared source
              <br />
              of understanding.
            </strong>
            <i />
            <i />
            <i />
            <span className="doc-access">✓ Access verified</span>
          </div>
          <div className="answer-paper">
            <span>✧ GROUNDED ANSWER</span>
            <i />
            <i />
            <div>
              <b>01</b> Source included
            </div>
          </div>
        </div>
        <div className="art-caption">
          The right context. The right permissions.
        </div>
      </div>
    );
  return (
    <div
      className={`project-art small-art ${kind === "lead-intelligence-agent" ? "blue-art" : "rose-art"}`}
    >
      <span className="mini-label">
        {kind === "lead-intelligence-agent"
          ? "RESEARCH → INSIGHT"
          : "QUESTION → CONTEXT"}
      </span>
      <div className="node-chain">
        <span>Input</span>
        <i />
        <span>
          {kind === "lead-intelligence-agent" ? "Research" : "Retrieve"}
        </span>
        <i />
        <span>Answer</span>
      </div>
    </div>
  );
}
