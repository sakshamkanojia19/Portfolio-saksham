import Link from "next/link";
export default function PublicationNav({ current }) {
  return (
    <nav className="publication-tabs" aria-label="Browse publications">
      <Link
        href="/posts"
        aria-current={current === "posts" ? "page" : undefined}
      >
        Short posts
      </Link>
      <Link
        href="/writing"
        aria-current={current === "writing" ? "page" : undefined}
      >
        Articles
      </Link>
      <Link
        href="/subscribe"
        aria-current={current === "subscribe" ? "page" : undefined}
      >
        Follow updates
      </Link>
    </nav>
  );
}
