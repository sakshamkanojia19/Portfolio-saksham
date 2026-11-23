import Link from "next/link";
import Markdown from "./Markdown";
import ArticleActions from "./ArticleActions";
import { postPath } from "../lib/publication.mjs";
import { dateLabel } from "../lib/site";
export default function NoteCard({
  post,
  stats,
  votesAvailable,
  standalone = false,
}) {
  return (
    <article className="note-card">
      <header className="note-author">
        <img src="/portrait.webp" width="44" height="44" alt="" />
        <div>
          <Link href="/about">Saksham Kanojia</Link>
          <span>
            AI Engineer ·{" "}
            <Link href={postPath(post)}>
              <time dateTime={post.published_at}>
                {dateLabel(post.published_at)}
              </time>
            </Link>
          </span>
        </div>
        <span className="note-format">Short post</span>
      </header>
      <Markdown>{post.body}</Markdown>
      {post.tags?.length > 0 && (
        <div className="tags">
          {post.tags.map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </div>
      )}
      <ArticleActions
        id={post.id}
        slug={post.slug}
        href={postPath(post)}
        initialCount={Number(stats?.vote_count || 0)}
        initialVoted={Boolean(stats?.has_voted)}
        available={votesAvailable}
      />
      {!standalone && (
        <Link className="text-link note-permalink" href={postPath(post)}>
          Open post
        </Link>
      )}
    </article>
  );
}
