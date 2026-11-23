import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { postPath } from "../../../lib/publication.mjs";
import { getPost, getPosts } from "../../../lib/posts";
import { sessionDb } from "../../../lib/supabase";
import {
  dateLabel,
  readingTime,
  metadata as pageMeta,
  siteUrl,
  jsonLd,
} from "../../../lib/site";
import Markdown from "../../../components/Markdown";
import ArticleActions from "../../../components/ArticleActions";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return {
    ...pageMeta(p.title, p.excerpt, `/writing/${slug}`),
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url: `/writing/${slug}`,
      type: "article",
      publishedTime: p.published_at,
      modifiedTime: p.updated_at,
      authors: ["Saksham Kanojia"],
    },
  };
}
export default async function Article({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  if (post.kind === "note") permanentRedirect(postPath(post));
  const db = await sessionDb();
  const { data: stats, error } = db
    ? await db.rpc("portfolio_vote_stats", { target_post: post.id })
    : { data: null, error: true };
  const { posts } = await getPosts();
  const related = posts
    .filter((p) => p.id !== post.id)
    .sort(
      (a, b) =>
        Number(b.tags?.some((t) => post.tags?.includes(t))) -
        Number(a.tags?.some((t) => post.tags?.includes(t))),
    )
    .slice(0, 3);
  return (
    <div className="container">
      <article className="article-shell">
        <header className="page-heading article-heading">
          <Link className="back-link" href="/writing">
            All writing
          </Link>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="article-byline">
            <img src="/portrait.webp" alt="" width="35" height="35" />
            <Link href="/about">Saksham Kanojia</Link>
            <span>·</span>
            <time dateTime={post.published_at}>
              {dateLabel(post.published_at)}
            </time>
            <span>· {readingTime(post.body)} min read</span>
          </div>
          <div className="tags">
            {post.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </header>
        <Markdown>{post.body}</Markdown>
        <ArticleActions
          id={post.id}
          slug={post.slug}
          initialCount={Number(stats?.[0]?.vote_count || 0)}
          initialVoted={Boolean(stats?.[0]?.has_voted)}
          available={!error}
        />
        <section className="related-posts">
          <h2>
            {related.length
              ? "Keep exploring."
              : "See the work behind the words."}
          </h2>
          {related.map((p) => (
            <Link key={p.id} href={postPath(p)}>
              {p.title}
            </Link>
          ))}
          <Link href="/projects">Explore my project case studies</Link>
          <Link href="/work-with-me">
            Have a problem in this space? Let’s talk.
          </Link>
        </section>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.published_at,
            dateModified: post.updated_at,
            author: {
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              name: "Saksham Kanojia",
              url: `${siteUrl}/about`,
            },
            mainEntityOfPage: `${siteUrl}/writing/${post.slug}`,
            image: `${siteUrl}/opengraph-image`,
          }),
        }}
      />
    </div>
  );
}
