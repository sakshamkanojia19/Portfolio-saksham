import Link from "next/link";
import { getPosts } from "../../lib/posts";
import { getLikeCounts } from "../../lib/likes";
import { metadata as pageMeta, jsonLd, siteUrl } from "../../lib/site";
import { postPath } from "../../lib/publication.mjs";
import PublicationNav from "../../components/PublicationNav";
import NoteCard from "../../components/NoteCard";
import SubscribeBox from "../../components/SubscribeBox";
export const dynamic = "force-dynamic";
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number.parseInt(params.page, 10) || 1);
  return pageMeta(
    "Posts — AI engineering thoughts and updates",
    "Short posts by Saksham Kanojia: things learned, systems built, and practical thoughts on AI engineering, RAG, and voice agents.",
    page > 1 ? `/posts?page=${page}` : "/posts",
  );
}
export default async function Posts({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number.parseInt(params.page, 10) || 1);
  const { posts, unavailable } = await getPosts();
  const all = posts.filter((p) => p.kind === "note");
  const notes = all.slice((page - 1) * 20, page * 20);
  const likes = await getLikeCounts(notes.map((p) => p.id));
  return (
    <div className="container posts-container">
      <div className="page-heading">
        <span className="eyebrow">Notebook · short posts</span>
        <h1>
          Thinking out loud.
          <br />
          <em>Building in public.</em>
        </h1>
        <p>
          Quick thoughts, small discoveries, and lessons from building AI
          systems. Read freely, and like what’s useful—no account needed.
        </p>
      </div>
      <PublicationNav current="posts" />
      <div className="posts-layout">
        <div>
          {notes.map((post) => (
            <NoteCard
              key={post.id}
              post={post}
              likeCount={likes.counts[post.id] || 0}
              likesAvailable={likes.available}
            />
          ))}
          {!notes.length && (
            <section className="empty-state">
              <span className="empty-symbol">✎</span>
              <h2>
                {unavailable
                  ? "Posts are temporarily unavailable."
                  : page > 1
                    ? "You’ve reached the end."
                    : "The first thought is still to come."}
              </h2>
              <p>
                {unavailable
                  ? "Please try again shortly."
                  : "Published short posts appear here. You can explore the project case studies while the notebook grows."}
              </p>
              <Link
                href={page > 1 ? "/posts" : "/projects"}
                className="button secondary"
              >
                {page > 1 ? "Back to latest posts" : "Explore projects"}
              </Link>
            </section>
          )}
          <nav className="feed-pagination" aria-label="Post pages">
            {page > 1 && (
              <Link
                className="button secondary"
                href={page === 2 ? "/posts" : `/posts?page=${page - 1}`}
              >
                Newer posts
              </Link>
            )}
            {all.length > page * 20 && (
              <Link
                className="button secondary"
                href={`/posts?page=${page + 1}`}
              >
                Older posts
              </Link>
            )}
          </nav>
        </div>
        <aside className="posts-aside">
          <h2>A little context.</h2>
          <p>
            I’m Saksham, an AI engineer working on production RAG, agents, and
            real-time voice systems.
          </p>
          <Link className="text-link" href="/about">
            About my work
          </Link>
          <hr />
          <h3>Looking for a deeper dive?</h3>
          <p>Read the decisions and tradeoffs behind the systems.</p>
          <Link className="text-link" href="/writing">
            Read articles
          </Link>
          <hr />
          <h3>Stay in the loop.</h3>
          <SubscribeBox source="/posts" heading="Get new posts by email." />
          <Link className="text-link" href="/subscribe">
            Or follow with RSS
          </Link>
        </aside>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Saksham Kanojia — Short Posts",
            url: `${siteUrl}/posts${page > 1 ? `?page=${page}` : ""}`,
            author: { "@id": `${siteUrl}/#person` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: notes.map((p, i) => ({
                "@type": "ListItem",
                position: (page - 1) * 20 + i + 1,
                url: `${siteUrl}${postPath(p)}`,
                name: p.title,
              })),
            },
          }),
        }}
      />
    </div>
  );
}
