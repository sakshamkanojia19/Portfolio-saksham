import { getPosts } from "../../lib/posts";
import { siteUrl } from "../../lib/site";
import { xmlEscape as x } from "../../lib/validation.mjs";
export const dynamic = "force-dynamic";
export async function GET() {
  const { posts, unavailable } = await getPosts();
  if (unavailable)
    return new Response("Feed temporarily unavailable", { status: 503 });
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Saksham Kanojia — Engineering Notebook</title><link>${x(siteUrl)}/writing</link><description>Notes on production AI, retrieval, and real-time voice systems.</description><language>en</language><atom:link href="${x(siteUrl)}/feed.xml" rel="self" type="application/rss+xml"/>${posts.map((p) => `<item><title>${x(p.title)}</title><link>${x(siteUrl)}/writing/${x(p.slug)}</link><guid isPermaLink="true">${x(siteUrl)}/writing/${x(p.slug)}</guid><description>${x(p.excerpt)}</description><pubDate>${new Date(p.published_at).toUTCString()}</pubDate></item>`).join("")}</channel></rss>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
