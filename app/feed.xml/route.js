import { getPosts } from "../../lib/posts";
import { siteUrl } from "../../lib/site";
import { buildRss } from "../../lib/rss.mjs";
export const dynamic = "force-dynamic";
export async function GET() {
  const { posts, unavailable } = await getPosts();
  if (unavailable)
    return new Response("Feed temporarily unavailable", { status: 503 });
  const xml = buildRss(posts, siteUrl);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
