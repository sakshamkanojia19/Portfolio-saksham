import { metadata as pageMeta } from "../../lib/site";
import { profile } from "../../lib/content";
export const metadata = pageMeta(
  "Privacy",
  "How this portfolio handles likes, email updates, sign-in, and work inquiries.",
  "/privacy",
);
export default function Privacy() {
  return (
    <div className="container privacy">
      <div className="page-heading">
        <span className="eyebrow">A SMALL SITE, A CLEAR POLICY</span>
        <h1>Privacy.</h1>
        <p>Last updated 25 November 2026</p>
      </div>
      <div className="prose">
        <h2>Reading the site</h2>
        <p>
          You do not need an account to read public pages. This site does not
          include advertising trackers or third-party analytics. The hosting
          provider may process routine request logs. Fonts load from Google
          Fonts, which receives the request and your IP address.
        </p>
        <h2>Likes</h2>
        <p>
          To like a post, you enter a name and email address. No account or
          email confirmation is needed. They are stored with the post you liked
          so each email counts once per post. Your email is never shown publicly
          or shared; public pages show only the total number of likes.
        </p>
        <h2>Email updates</h2>
        <p>
          If you subscribe, your name and email are stored so I can email you
          when I publish something new. Subscribing is always a separate choice.
          You can unsubscribe at any time by replying to any update or emailing
          me.
        </p>
        <h2>Sign-in</h2>
        <p>
          Readers do not need an account. Supabase stores this site’s data and
          handles sign-in for the site owner. Signed-in sessions use essential
          cookies. Upvotes made with earlier reader accounts are kept and
          counted as likes.
        </p>
        <h2>Your browser preferences</h2>
        <p>
          The selected color theme, and the name and email you last used to like
          or subscribe, are stored locally in your browser so you don’t have to
          retype them. Clearing site data removes them.
        </p>
        <h2>Work inquiries</h2>
        <p>
          The contact form prepares an email in your own email app. It does not
          send or store form submissions on this website. An inquiry is
          delivered only when you send that email.
        </p>
        <h2>Questions or deletion requests</h2>
        <p>
          Email <a href={`mailto:${profile.email}`}>{profile.email}</a> to ask
          about your data or request deletion of your likes, subscription, or
          account.
        </p>
      </div>
    </div>
  );
}
