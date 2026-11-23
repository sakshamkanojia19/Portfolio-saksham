export function postPath(post) {
  return `${post.kind === "note" ? "/posts" : "/writing"}/${post.slug}`;
}
export function plainSummary(body) {
  return String(body)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`>~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
export function prepareNote(input, suffix) {
  const body = String(input.body || "").trim();
  if (!body || body.length > 5000)
    throw new Error("Write a post between 1 and 5,000 characters.");
  const summary = plainSummary(body) || "A short engineering note";
  const title =
    summary.length >= 5 ? summary.slice(0, 100) : `A quick thought: ${summary}`;
  const excerpt = (
    summary.length >= 20
      ? summary
      : `A short post by Saksham Kanojia: ${summary}`
  ).slice(0, 300);
  const slugBase =
    summary
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 45)
      .replace(/-$/, "") || "note";
  const tags = [
    ...new Set(
      String(input.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    ),
  ];
  if (tags.length > 5 || tags.some((t) => t.length > 30))
    throw new Error(
      "Use up to five topics, each no longer than 30 characters.",
    );
  return {
    kind: "note",
    title,
    excerpt,
    body,
    tags,
    slug: `${slugBase}-${suffix}`,
    status: input.status === "published" ? "published" : "draft",
  };
}
