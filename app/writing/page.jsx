import Link from "next/link";
import { getPosts } from "../../lib/posts";
import { metadata as pageMeta } from "../../lib/site";
import WritingList from "../../components/WritingList";
import PublicationNav from "../../components/PublicationNav";
export const dynamic = "force-dynamic";
export const metadata = pageMeta(
  "Writing",
  "Engineering notes from Saksham Kanojia on production AI, retrieval, voice agents, and building useful systems.",
  "/writing",
);
export default async function Writing() {
  const { posts: all, unavailable } = await getPosts();
  const posts = all.filter((p) => p.kind !== "note");
  return (
    <div className="container writing-container">
      <div className="page-heading">
        <span className="eyebrow">Notebook · articles</span>
        <h1>
          Learn. Build.
          <br />
          <em>Write it down.</em>
        </h1>
        <p>
          Notes on the decisions, bugs, and small discoveries behind building
          AI systems in the real world.
        </p>
      </div>
      <PublicationNav current="writing" />
      {posts.length ? (
        <WritingList posts={posts} />
      ) : (
        <section className="empty-state">
          <span className="empty-symbol">✎</span>
          <h2>
            {unavailable
              ? "The notebook is temporarily unavailable."
              : "The notebook starts here."}
          </h2>
          <p>
            {unavailable
              ? "Please try again shortly. You can still explore my project case studies."
              : "New engineering notes will appear here as I publish them. In the meantime, explore the decisions behind Nexus and CollabDocs."}
          </p>
          <Link className="button secondary" href="/projects">
            Explore the case studies
          </Link>
        </section>
      )}
    </div>
  );
}
