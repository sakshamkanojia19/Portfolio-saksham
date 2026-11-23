"use client";
import { useState } from "react";
export default function FeedSubscription({ url }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus(
        "Feed URL copied. Paste it into your RSS reader’s follow or subscribe field.",
      );
    } catch {
      setStatus("Select and copy the feed URL below.");
    }
  }
  return (
    <div className="feed-subscribe">
      <label>
        RSS feed URL
        <input value={url} readOnly onFocus={(e) => e.target.select()} />
      </label>
      <button className="button primary" onClick={copy}>
        Copy feed URL
      </button>
      <p role="status">{status}</p>
      <a className="text-link" href="/feed.xml">
        View raw RSS XML
      </a>
    </div>
  );
}
