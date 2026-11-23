import { metadata as pageMeta } from "../../lib/site";
import { profile } from "../../lib/content";
export const metadata = pageMeta(
  "Privacy",
  "How this portfolio handles sign-in, votes, and work inquiries.",
  "/privacy",
);
export default function Privacy() {
  return (
    <div className="container privacy">
      <div className="page-heading">
        <span className="eyebrow">A SMALL SITE, A CLEAR POLICY</span>
        <h1>Privacy.</h1>
        <p>Last updated 23 November 2026</p>
      </div>
      <div className="prose">
        <h2>Reading the site</h2>
        <p>
          You do not need an account to read public pages. This site does not
          include advertising trackers or third-party analytics. The hosting
          provider may process routine request logs. Fonts load from Google
          Fonts, which receives the request and your IP address.
        </p>
        <h2>Sign-in and upvotes</h2>
        <p>
          When enabled, Supabase handles email sign-in. Your email, account
          identifier, authentication session, and article votes are stored to
          provide that functionality. Public pages show vote totals, not voter
          email addresses. Authentication uses essential session cookies.
        </p>
        <h2>Your browser preferences</h2>
        <p>
          The selected color theme is stored locally in your browser. Clearing
          site data removes that preference.
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
          about your data or request deletion of your account and votes.
        </p>
      </div>
    </div>
  );
}
