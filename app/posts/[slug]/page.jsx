import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getPost } from "../../../lib/posts";
import { sessionDb } from "../../../lib/supabase";
import { metadata as pageMeta, jsonLd, siteUrl } from "../../../lib/site";
import { postPath } from "../../../lib/publication.mjs";
import NoteCard from "../../../components/NoteCard";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const p = await getPost((await params).slug);
  if (!p) return {};
  return {
    ...pageMeta(p.title, p.excerpt, postPath(p)),
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      url: postPath(p),
      publishedTime: p.published_at,
      modifiedTime: p.updated_at,
      authors: ["Saksham Kanojia"],
      images: [`/posts/${p.slug}/opengraph-image`],
    },
  };
}
export default async function Post({ params }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  if (post.kind !== "note") permanentRedirect(postPath(post));
  const db = await sessionDb();
  const { data: stats, error } = db
    ? await db.rpc("portfolio_vote_stats", { target_post: post.id })
    : { data: null, error: true };
  return (
    <div className="container post-detail">
      <div className="page-heading">
        <Link className="back-link" href="/posts">
          All short posts
        </Link>
        <h1 className="post-detail-title">{post.title}</h1>
      </div>
      <NoteCard
        post={post}
        stats={stats?.[0]}
        votesAvailable={!error}
        standalone
      />
      <div className="inline-cta">
        <p>Building something in this space?</p>
        <Link className="button secondary" href="/work-with-me">
          Let’s talk
        </Link>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "SocialMediaPosting",
            "@id": `${siteUrl}${postPath(post)}#post`,
            url: `${siteUrl}${postPath(post)}`,
            mainEntityOfPage: `${siteUrl}${postPath(post)}`,
            headline: post.title,
            description: post.excerpt,
            articleBody: post.body,
            datePublished: post.published_at,
            dateModified: post.updated_at,
            author: {
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              name: "Saksham Kanojia",
              url: `${siteUrl}/about`,
            },
            isPartOf: { "@id": `${siteUrl}/#website` },
          }),
        }}
      />
    </div>
  );
}
