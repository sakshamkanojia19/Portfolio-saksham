"use client";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { likePost, subscribeToUpdates } from "../app/actions";
import Spinner from "./Spinner";
import {
  savedReader,
  saveReader,
  hasLiked,
  rememberLike,
} from "../lib/reader.mjs";
export default function LikeButton({ id, initialCount = 0, available = true }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [reader, setReader] = useState(null);
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [pending, start] = useTransition();
  const dialog = useRef(null);
  const titleId = useId();
  useEffect(() => {
    setLiked(hasLiked(id));
    setReader(savedReader());
  }, [id]);
  function submit(details, subscribe = false) {
    setFormError("");
    start(async () => {
      try {
        const result = await likePost(id, details);
        if (result.error) {
          if (dialog.current?.open) setFormError(result.error);
          else {
            // A remembered reader whose details are no longer accepted.
            setMessage(result.error);
            dialog.current?.showModal();
          }
          return;
        }
        if (Number.isFinite(result.count)) setCount(result.count);
        setLiked(true);
        rememberLike(id);
        const who = { name: details.name.trim(), email: details.email.trim() };
        saveReader(who);
        setReader(who);
        dialog.current?.close();
        let text = `Thanks for the like, ${who.name}.`;
        if (subscribe) {
          const sub = await subscribeToUpdates(
            { ...who, website: details.website },
            window.location.pathname,
          );
          text += sub.error
            ? ` Email updates: ${sub.error}`
            : " You’ll get new posts by email.";
        }
        setMessage(text);
      } catch {
        setFormError("Could not save your like. Please try again.");
      }
    });
  }
  function onLike() {
    if (liked || pending) return;
    setMessage("");
    if (reader) submit(reader);
    else dialog.current?.showModal();
  }
  function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    submit(
      {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        website: String(form.get("website") || ""),
      },
      form.get("subscribe") === "on",
    );
  }
  return (
    <div className="like-area">
      <button
        type="button"
        className="like-button"
        aria-pressed={liked}
        onClick={onLike}
        disabled={!available || pending}
      >
        <span aria-hidden="true">{liked ? "♥" : "♡"}</span>
        {!available
          ? "Likes unavailable"
          : pending
            ? (
              <>
                <Spinner /> Saving
              </>
            )
            : `${liked ? "Liked" : "Like"} · ${count}`}
      </button>
      <p className="status-message" role="status">
        {message}
      </p>
      <dialog
        ref={dialog}
        className="reader-dialog"
        aria-labelledby={titleId}
        onClose={() => setFormError("")}
      >
        <form onSubmit={onSubmit}>
          <h2 id={titleId}>Like this post</h2>
          <p>
            Add your name and email once. Your email stays private and is never
            shown.
          </p>
          <label>
            Name
            <input
              name="name"
              required
              maxLength={80}
              autoComplete="name"
              defaultValue={reader?.name || ""}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="you@example.com"
              defaultValue={reader?.email || ""}
            />
          </label>
          <label className="check-label">
            <input type="checkbox" name="subscribe" />
            Also email me when I publish something new
          </label>
          <label className="hp-field" aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <p className="form-error" role="alert">
            {formError}
          </p>
          <div className="dialog-actions">
            <button className="button primary" disabled={pending}>
              {pending ? (
                <>
                  <Spinner /> Saving
                </>
              ) : (
                "♥ Like"
              )}
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => dialog.current?.close()}
            >
              Cancel
            </button>
          </div>
          <p className="form-note">
            One like per email. See the{" "}
            <Link href="/privacy">privacy policy</Link>.
          </p>
        </form>
      </dialog>
    </div>
  );
}
