import { postPath, plainSummary } from "./publication.mjs";
import { xmlEscape as x } from "./validation.mjs";
export function buildRss(posts, origin) {
  const items = posts
    .filter((p) => p.status === "published")
    .map(
      (p) => `    <item>
      <title>${x(p.title)}</title>
      <link>${x(origin + postPath(p))}</link>
      <guid isPermaLink="true">${x(origin + postPath(p))}</guid>
      <description>${x(p.kind === "note" ? plainSummary(p.body) : p.excerpt)}</description>
      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Saksham Kanojia — Posts &amp; Articles</title>
    <link>${x(origin)}/posts</link>
    <description>Short thoughts and longer articles on production AI, retrieval, and voice systems.</description>
    <language>en</language>
    <atom:link href="${x(origin)}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}
