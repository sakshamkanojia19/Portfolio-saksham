"use client";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { subscribeToUpdates } from "../app/actions";
import { savedReader, saveReader } from "../lib/reader.mjs";
export default function SubscribeBox({
  source = "",
  heading = "New posts, build notes, and lessons from shipping AI—straight to your inbox.",
}) {
  const [reader, setReader] = useState(null);
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  useEffect(() => setReader(savedReader()), []);
  function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const details = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      website: String(form.get("website") || ""),
    };
    setError("");
    start(async () => {
      try {
        const result = await subscribeToUpdates(details, source);
        if (result.error) return setError(result.error);
        saveReader({ name: details.name.trim(), email: details.email.trim() });
        setDone(
          `You’re in, ${details.name.trim()}. New posts will reach your inbox.`,
        );
      } catch {
        setError("Could not subscribe you. Please try again.");
      }
    });
  }
  return (
    <section className="subscribe-box" aria-label="Get new posts by email">
      <p className="subscribe-heading">{heading}</p>
      {done ? (
        <p className="status-message" role="status">
          {done}
        </p>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="subscribe-fields">
            <label>
              <span className="sr-only">Your name</span>
              <input
                name="name"
                required
                maxLength={80}
                autoComplete="name"
                placeholder="Your name"
                defaultValue={reader?.name || ""}
                key={`n-${reader?.name || ""}`}
              />
            </label>
            <label>
              <span className="sr-only">Your email</span>
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="Your email"
                defaultValue={reader?.email || ""}
                key={`e-${reader?.email || ""}`}
              />
            </label>
            <label className="hp-field" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <button className="button primary" disabled={pending}>
              {pending ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
          <p className="form-error" role="alert">
            {error}
          </p>
          <p className="form-note">
            Occasional emails when I publish. No spam; unsubscribe anytime.{" "}
            <Link href="/privacy">Privacy</Link>
          </p>
        </form>
      )}
    </section>
  );
}
