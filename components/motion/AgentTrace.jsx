"use client";
import { useEffect, useState } from "react";

// A stylised, looping trace of one Nexus voice turn. Timings mirror the
// figures published in the Nexus case study (~0.6s STT, ~1s first token).
const LINES = [
  ["vad.listen", "speech detected", "live"],
  ["endpoint.decide", "pitch ↓ · clause complete", "ok"],
  ["stt.whisper", "“what changed in the leave policy?”", "0.58s"],
  ["router.tool", "→ docs.search · user scope", "ok"],
  ["qdrant.query", "top_k 8 · 6 grounded", "ok"],
  ["llm.stream", "first token", "0.94s"],
  ["tts.speak", "streaming · barge-in armed", "live"],
];

export default function AgentTrace() {
  const [shown, setShown] = useState(LINES.length);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let count = 0;
    let timer = setTimeout(() => {
      setLive(true);
      if (reduce) return;
      setShown(0);
      timer = setTimeout(step, 500);
    }, 0);
    function step() {
      count += 1;
      setShown(count);
      if (count >= LINES.length) {
        timer = setTimeout(() => {
          count = 0;
          setShown(0);
          timer = setTimeout(step, 600);
        }, 3600);
      } else {
        timer = setTimeout(step, 560 + Math.random() * 420);
      }
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`agent-trace${live ? " live" : ""}`}>
      <div className="trace-bar">
        <span className="trace-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>nexus · voice turn</span>
        <span className="trace-tag">sample trace</span>
      </div>
      <ol className="trace-lines">
        {LINES.map(([cmd, detail, status], i) => (
          <li key={cmd} className={i < shown ? "on" : undefined}>
            <span className="trace-cmd">{cmd}</span>
            <span className="trace-detail">{detail}</span>
            <span className={`trace-status ${status}`}>
              {status === "ok" ? "✓" : status}
            </span>
          </li>
        ))}
      </ol>
      <div className="trace-foot" aria-hidden="true">
        <span className="caret" />
      </div>
    </div>
  );
}
