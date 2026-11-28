import { getPosts } from "../../lib/posts";
import { siteUrl } from "../../lib/site";
import { postPath } from "../../lib/publication.mjs";
import {
  profile,
  projects,
  experience,
  facts,
  summary,
} from "../../lib/content";
export const dynamic = "force-dynamic";

// llms.txt: a plain-Markdown profile for AI assistants and answer engines,
// following the llmstxt.org convention. Same facts as the public pages.
export async function GET() {
  const { posts } = await getPosts();
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${summary}`,
    "",
    ...facts.map(([k, v]) => `- ${k}: ${v}`),
    `- GitHub: ${profile.github}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- Email: ${profile.email}`,
    "",
    "## Case studies",
    "",
    ...projects.map(
      (p) =>
        `- [${p.name}](${siteUrl}/projects/${p.slug}): ${p.summary} Stack: ${p.stack.join(", ")}.${
          p.metrics.length
            ? ` Reported: ${p.metrics.map(([v, l]) => `${v} ${l}`).join("; ")}.`
            : ""
        }${p.caveat ? ` Caveat: ${p.caveat}` : ""}`,
    ),
    "",
    "## Experience",
    "",
    ...experience.map(
      (e) => `- ${e.role}, ${e.company} (${e.period}): ${e.impact.join("; ")}.`,
    ),
    "",
    "## Pages",
    "",
    `- [About](${siteUrl}/about): background, experience, toolkit, and quick answers`,
    `- [Work with me](${siteUrl}/work-with-me): services and contact for roles or freelance projects`,
    `- [Short posts](${siteUrl}/posts): quick engineering notes`,
    `- [Articles](${siteUrl}/writing): long-form technical writing`,
    `- [RSS feed](${siteUrl}/feed.xml)`,
  ];
  if (posts.length) {
    lines.push("", "## Recent writing", "");
    for (const p of posts.slice(0, 15))
      lines.push(`- [${p.title}](${siteUrl}${postPath(p)}): ${p.excerpt}`);
  }
  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
