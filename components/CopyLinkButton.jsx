"use client";
import { useState } from "react";
export default function CopyLinkButton({ href, className = "share-link" }) {
  const [copied, setCopied] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        new URL(href, window.location.origin).href,
      );
      setCopied("Link copied");
    } catch {
      setCopied("Copy the address from your browser");
    }
    setTimeout(() => setCopied(""), 2500);
  }
  return (
    <button type="button" className={className} onClick={copy}>
      <span aria-live="polite">{copied || "Copy link"}</span>
    </button>
  );
}
