import { ImageResponse } from "next/og";
import { getPost } from "../../../lib/posts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";
export default async function Image({ params }) {
  const post = await getPost((await params).slug);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0b",
        color: "#f4f4f5",
        border: "1px solid #222225",
        width: "100%",
        height: "100%",
        padding: 70,
      }}
    >
      <div style={{ display: "flex", color: "#a1a1aa", fontSize: 24 }}>
        <span style={{ color: "#f59e0b", marginRight: 14 }}>{"// post"}</span>
        SAKSHAM KANOJIA — AI ENGINEER
      </div>
      <div style={{ display: "flex", fontSize: 54, lineHeight: 1.15, letterSpacing: "-1.5px" }}>
        {post?.title || "Thoughts on building AI systems."}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#a1a1aa",
          borderTop: "1px solid #27272a",
          paddingTop: 24,
        }}
      >
        Short posts · Lessons learned · Building in public
      </div>
    </div>,
    size,
  );
}
