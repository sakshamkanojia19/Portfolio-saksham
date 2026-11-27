const ROWS = [
  [
    "OpenAI",
    "Claude",
    "LangChain",
    "LangGraph",
    "MCP",
    "Pinecone",
    "Qdrant",
    "Pipecat",
    "Sarvam AI",
    "Cartesia",
    "faster-whisper",
    "Silero VAD",
    "Groq",
    "n8n",
  ],
  [
    "Python",
    "FastAPI",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Supabase",
    "WebSockets",
    "AWS",
    "GCP · Cloud Run",
    "Docker",
    "GitHub Actions",
  ],
];

export default function StackMarquee() {
  return (
    <section className="marquee-band" aria-label="Tools I work with">
      {ROWS.map((row, r) => (
        <div className={`marquee${r ? " reverse" : ""}`} key={r}>
          <ul className="marquee-track">
            {[...row, ...row].map((item, i) => (
              <li key={i} aria-hidden={i >= row.length ? "true" : undefined}>
                <span className="marquee-dot" aria-hidden="true">
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
