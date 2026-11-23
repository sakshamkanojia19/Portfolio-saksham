import { ImageResponse } from "next/og";
export const alt =
  "Saksham Kanojia — AI Engineer. Production RAG, agents, and real-time voice.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#111310",
        color: "#f1f2e9",
        display: "flex",
        flexDirection: "column",
        padding: "70px 80px",
        fontFamily: "sans-serif",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, color: "#d3f68a" }}>
        SAKSHAM KANOJIA · AI ENGINEER
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 74,
          letterSpacing: "-3px",
          lineHeight: 1.1,
        }}
      >
        <span>I build AI that works</span>
        <span style={{ color: "#d3f68a" }}>in the real world.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #30352c",
          paddingTop: 25,
          color: "#a2a79b",
          fontSize: 24,
        }}
      >
        Production RAG · Agents · Real-time voice · Full-stack engineering
      </div>
    </div>,
    size,
  );
}
