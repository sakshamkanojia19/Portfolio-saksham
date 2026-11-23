"use client";
import { useActionState } from "react";
import { sendLogin } from "../app/actions";
export default function LoginForm({ next }) {
  const [state, action, pending] = useActionState(sendLogin, {});
  return (
    <form action={action} className="auth-card">
      <input type="hidden" name="next" value={next} />
      <label>
        Email address
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>
      <button className="button primary" disabled={pending}>
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
      <p className="status-message" role="status">
        {state.error || state.success}
      </p>
      <p className="form-note">
        Signing in lets you upvote articles. Publishing is restricted to
        Saksham’s account.
      </p>
    </form>
  );
}
