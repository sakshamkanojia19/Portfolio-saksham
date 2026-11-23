import { siteUrl } from "../lib/site";
import { projects } from "../lib/content";
import { getPosts } from "../lib/posts";
import { postPath } from "../lib/publication.mjs";
export const dynamic = "force-dynamic";
export default async function sitemap() {
  const { posts, unavailable } = await getPosts();
  if (unavailable)
    throw new Error("Unable to load published articles for sitemap");
  return [
    ...[
      "/",
      "/projects",
      "/writing",
      "/posts",
      "/subscribe",
      "/about",
      "/work-with-me",
      "/contact",
      "/privacy",
    ].map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: path === "/writing" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
    })),
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${siteUrl}${postPath(p)}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
