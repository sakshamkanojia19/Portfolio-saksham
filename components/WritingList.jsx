"use client";
import Link from "next/link";
import { useState } from "react";
import { dateLabel } from "../lib/site";
export default function WritingList({ posts }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const tags = ["All", ...new Set(posts.flatMap((p) => p.tags || []))];
  const filtered = posts.filter(
    (p) =>
      (tag === "All" || p.tags?.includes(tag)) &&
      `${p.title} ${p.excerpt} ${p.tags?.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="writing-tools">
        <label className="search-label">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the notebook…"
          />
        </label>
        <div className="filter-tags" aria-label="Filter articles by topic">
          {tags.map((t) => (
            <button key={t} aria-pressed={t === tag} onClick={() => setTag(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="writing-list">
        {filtered.map((p) => (
          <article key={p.id}>
            <div className="post-meta">
              <time dateTime={p.published_at}>{dateLabel(p.published_at)}</time>
              <span>{p.tags?.[0] || "Engineering"}</span>
            </div>
            <div>
              <h2>
                <Link href={`/writing/${p.slug}`}>{p.title}</Link>
              </h2>
              <p>{p.excerpt}</p>
              <Link className="text-link" href={`/writing/${p.slug}`}>
                Read article
              </Link>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No matching articles.</h2>
          <p>Try a different topic or search term.</p>
          <button
            className="button secondary"
            onClick={() => {
              setTag("All");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
