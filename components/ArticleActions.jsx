"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { vote } from "../app/actions";
export default function ArticleActions({
  id,
  slug,
  initialCount,
  initialVoted,
  available,
}) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(initialVoted);
  const [message, setMessage] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();
  function onVote() {
    start(async () => {
      try {
        const result = await vote(id, !voted);
        if (result.login) {
          router.push(`/login?next=${encodeURIComponent(`/writing/${slug}`)}`);
          return;
        }
        if (result.error) setMessage(result.error);
        else {
          setCount(result.count);
          setVoted(result.voted);
          setMessage(
            result.voted ? "Thanks for the signal." : "Upvote removed.",
          );
        }
      } catch {
        setMessage("Could not update your vote. Please try again.");
      }
    });
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("Article link copied.");
    } catch {
      setMessage("Copy this page’s address from your browser to share it.");
    }
  }
  return (
    <>
      <div className="article-actions">
        <button
          className="vote-button"
          aria-pressed={voted}
          onClick={onVote}
          disabled={pending || !available}
        >
          {pending
            ? "Saving…"
            : available
              ? `${voted ? "Upvoted" : "Upvote"} · ${count}`
              : "Upvotes unavailable"}
        </button>
        <button className="button secondary" onClick={share}>
          Copy article link
        </button>
      </div>
      <p role="status" className="status-message">
        {message}
      </p>
    </>
  );
}
