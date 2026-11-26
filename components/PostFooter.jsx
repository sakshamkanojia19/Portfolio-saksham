import Link from "next/link";
import { siteUrl } from "../lib/site";
import { postPath } from "../lib/publication.mjs";
import CopyLinkButton from "./CopyLinkButton";
import SubscribeBox from "./SubscribeBox";
// Plain share links (no third-party scripts or trackers); they work without JS.
export function shareTargets(url, title) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return [
    ["X", `https://x.com/intent/post?text=${t}&url=${u}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    [
      "WhatsApp",
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    ],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ["Telegram", `https://t.me/share/url?url=${u}&text=${t}`],
    [
      "Email",
      `mailto:?subject=${t}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
    ],
  ];
}
export default function PostFooter({ post, newer, older }) {
  const path = postPath(post);
  const url = `${siteUrl}${path}`;
  return (
    <footer className="post-footer">
      <SubscribeBox source={path} />
      <div className="share-row">
        <span className="share-label">Share this post on:</span>
        <div className="share-links">
          {shareTargets(url, post.title).map(([name, href]) => (
            <a
              key={name}
              className="share-link"
              href={href}
              target={name === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={`Share on ${name}`}
            >
              {name}
            </a>
          ))}
          <CopyLinkButton href={path} />
        </div>
      </div>
      <nav className="post-nav" aria-label="More posts">
        {older ? (
          <Link href={postPath(older)} className="post-nav-link">
            <span>← Older post</span>
            <strong>{older.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link href={postPath(newer)} className="post-nav-link newer">
            <span>Newer post →</span>
            <strong>{newer.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
      <a className="back-to-top" href="#main">
        ↑ Back to top
      </a>
    </footer>
  );
}
// Neighbours in the full published timeline (newest first).
export function neighbours(posts, post) {
  const i = posts.findIndex((p) => p.id === post.id);
  if (i === -1) return { newer: null, older: null };
  return { newer: posts[i - 1] || null, older: posts[i + 1] || null };
}
