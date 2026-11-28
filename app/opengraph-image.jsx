import { ImageResponse } from "next/og";
export const alt =
  "Saksham Kanojia — AI Engineer. Production RAG, agents, and real-time voice.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const AMBER = "#f59e0b";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0a0a0b",
        color: "#f4f4f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        fontFamily: "sans-serif",
        border: "1px solid #222225",
        backgroundImage:
          "linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa", letterSpacing: 1 }}>
        <span style={{ color: AMBER, marginRight: 14 }}>{"00 //"}</span>
        SAKSHAM KANOJIA — AI ENGINEER
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          letterSpacing: "-3px",
          lineHeight: 1.05,
          fontWeight: 600,
        }}
      >
        <span>AI systems that hold up</span>
        <span style={{ color: AMBER }}>in production.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #27272a",
          paddingTop: 24,
          color: "#a1a1aa",
          fontSize: 24,
          gap: 36,
        }}
      >
        <span>RAG</span>
        <span>Voice agents</span>
        <span>Agentic workflows</span>
        <span style={{ color: "#f4f4f5" }}>~1s TTFT · 250+ clients audited daily</span>
      </div>
    </div>,
    size,
  );
}
