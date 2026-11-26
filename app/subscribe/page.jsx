import Link from "next/link";
import { metadata as pageMeta, siteUrl } from "../../lib/site";
import PublicationNav from "../../components/PublicationNav";
import FeedSubscription from "../../components/FeedSubscription";
import SubscribeBox from "../../components/SubscribeBox";
export const metadata = pageMeta(
  "Follow posts and articles",
  "Get Saksham Kanojia’s AI engineering posts and articles by email or through the public RSS feed.",
  "/subscribe",
);
export default function Subscribe() {
  return (
    <div className="container writing-container">
      <div className="page-heading">
        <span className="eyebrow">FOLLOW THE WORK</span>
        <h1>
          Keep up.
          <br />
          <em>On your own terms.</em>
        </h1>
        <p>
          Get new posts by email, read them here, or follow in an RSS reader.
        </p>
      </div>
      <PublicationNav current="subscribe" />
      <SubscribeBox source="/subscribe" />
      <section className="subscribe-layout">
        <div className="prose">
          <h2>What is RSS?</h2>
          <p>
            RSS sends your reader app a list of new posts and articles. Copy the
            feed address, open an RSS reader, and paste it into its “Add feed”
            or “Follow” field.
          </p>
          <p>
            The raw feed is XML meant for reader apps. Seeing XML in your
            browser is expected; it is not the posting page or an email
            subscription.
          </p>
          <h3>Just want to read?</h3>
          <p>
            <Link href="/posts">Browse the public posts</Link>. No sign-in is
            required. New posts will appear after I publish them.
          </p>
        </div>
        <FeedSubscription url={`${siteUrl}/feed.xml`} />
      </section>
    </div>
  );
}
