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
      <span className="eyebrow">Sign in</span>
      <h1>
        Welcome
        <br />
        <em>back.</em>
      </h1>
      <p>
        Readers don’t need an account. Like posts and follow updates directly
        from any post.
      </p>
      {params.error && (
        <p role="alert">
          That sign-in link could not be verified. Sign in with your email and
          password instead.
        </p>
      )}
      {configured() ? (
        <LoginForm next={safeNext(params.next)} />
      ) : (
        <div className="auth-card">
          <h2>Sign-in is not available right now.</h2>
          <p>You can read every published post without an account.</p>
          <Link className="text-link" href="/posts">
            Read the posts
          </Link>
        </div>
      )}
    </div>
  );
}
