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
        background: "#111310",
        color: "#f1f2e9",
        width: "100%",
        height: "100%",
        padding: 70,
      }}
    >
      <div style={{ display: "flex", color: "#d3f68a", fontSize: 26 }}>
        SAKSHAM KANOJIA · AI ENGINEER
      </div>
      <div style={{ display: "flex", fontSize: 52, lineHeight: 1.2 }}>
        {post?.title || "Thoughts on building AI systems."}
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#a2a79b" }}>
        Short posts · Lessons learned · Building in public
      </div>
    </div>,
    size,
  );
}
