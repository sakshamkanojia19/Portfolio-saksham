export function safeNext(value) {
  return typeof value === "string" &&
    /^\/(?!\/)/.test(value) &&
    !/[\\\r\n]/.test(value)
    ? value
    : "/writing";
}
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Mirrors the database checks so readers get instant, friendly errors.
export function validateReader(input) {
  const name = String(input?.name ?? "").trim();
  const email = String(input?.email ?? "")
    .trim()
    .toLowerCase();
  if (!name || name.length > 80)
    throw new Error("Enter your name (up to 80 characters).");
  if (email.length > 254 || !EMAIL.test(email))
    throw new Error("Enter a valid email address.");
  return { name, email };
}
export function validatePost(input) {
  const post = {
    title: String(input.title || "").trim(),
    slug: String(input.slug || "").trim(),
    excerpt: String(input.excerpt || "").trim(),
    body: String(input.body || "").trim(),
    status: input.status === "published" ? "published" : "draft",
    tags: String(input.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };
  if (post.title.length < 5 || post.title.length > 160)
    throw new Error("Use a title between 5 and 160 characters.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || post.slug.length > 100)
    throw new Error(
      "Use a slug of at most 100 lowercase letters, numbers, and hyphens.",
    );
  if (post.excerpt.length < 20 || post.excerpt.length > 300)
    throw new Error("Use a description between 20 and 300 characters.");
  if (post.body.length < 50 || post.body.length > 100000)
    throw new Error(
      "Article content must be between 50 and 100,000 characters.",
    );
  if (post.tags.length > 5 || post.tags.some((t) => t.length > 30))
    throw new Error("Use up to five tags, each no longer than 30 characters.");
  return post;
}
export function xmlEscape(value) {
  return String(value).replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
}
