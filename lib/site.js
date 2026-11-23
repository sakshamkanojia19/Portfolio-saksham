export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://saksham-kanojia.vercel.app"
).replace(/\/$/, "");
export function metadata(title, description, path = "/") {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
export function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
export function dateLabel(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
export function readingTime(text = "") {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 220));
}
