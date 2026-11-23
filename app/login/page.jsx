import Link from "next/link";
import { configured } from "../../lib/supabase";
import { safeNext } from "../../lib/validation.mjs";
import LoginForm from "../../components/LoginForm";
export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};
export default async function Login({ searchParams }) {
  const params = await searchParams;
  return (
    <div className="auth-shell">
      <span className="eyebrow">JOIN THE CONVERSATION</span>
      <h1>
        A little signal
        <br />
        <em>goes a long way.</em>
      </h1>
      <p>
        Sign in to upvote useful engineering notes. No password to remember.
      </p>
      {params.error && (
        <p role="alert">
          That sign-in link could not be verified. Request a fresh link and open
          it in the same browser.
        </p>
      )}
      {configured() ? (
        <LoginForm next={safeNext(params.next)} />
      ) : (
        <div className="auth-card">
          <h2>Sign-in is coming soon.</h2>
          <p>You can read every published article without an account.</p>
          <Link className="text-link" href="/writing">
            Back to writing
          </Link>
        </div>
      )}
    </div>
  );
}
