import Link from "next/link";
import Markdown from "./Markdown";
import LikeButton from "./LikeButton";
import CopyLinkButton from "./CopyLinkButton";
import { postPath } from "../lib/publication.mjs";
import { dateLabel } from "../lib/site";
export default function NoteCard({
  post,
  likeCount = 0,
  likesAvailable,
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
      <div className="article-actions">
        <LikeButton
          id={post.id}
          initialCount={likeCount}
          available={likesAvailable}
        />
        {!standalone && (
          <div className="note-links">
            <CopyLinkButton
              href={postPath(post)}
              className="button secondary"
            />
            <Link className="text-link note-permalink" href={postPath(post)}>
              Open post
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
