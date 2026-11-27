"use client";
import { useActionState } from "react";
import { signIn } from "../app/actions";
import Spinner from "./Spinner";
export default function LoginForm({ next }) {
  const [state, action, pending] = useActionState(signIn, {});
  return (
    <form action={action} className="auth-card">
      <input type="hidden" name="next" value={next} />
      <label>
        Email address
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          placeholder="you@example.com"
          defaultValue={state.email || ""}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
        />
      </label>
      <button className="button primary" disabled={pending}>
        {pending ? (
          <>
            <Spinner /> Signing in
          </>
        ) : (
          "Sign in"
        )}
      </button>
      <p className="status-message" role="status">
        {state.error}
      </p>
    </form>
  );
}
