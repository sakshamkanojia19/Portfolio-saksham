import { siteUrl } from "../lib/site";
export default function robots() {
  return {
    // /admin is intentionally not listed: robots.txt is public and would
    // advertise it. It stays out of search via 404s and noindex metadata.
    rules: { userAgent: "*", allow: "/", disallow: ["/auth/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
