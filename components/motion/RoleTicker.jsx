"use client";
import { useEffect, useState } from "react";

const PHRASES = [
  "voice agents that speak Hinglish",
  "permission-aware RAG",
  "agentic research pipelines",
  "LLM audits across 250+ clients",
  "internal SaaS platforms",
];

// Typewriter line in the hero. The server renders the first phrase, so the
// page reads fine without JavaScript; screen readers get the full list once.
export default function RoleTicker() {
  const [text, setText] = useState(PHRASES[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    let pos = PHRASES[0].length;
    let deleting = true;
    let timer;
    function tick() {
      const word = PHRASES[index];
      if (deleting) {
        pos -= 1;
        setText(word.slice(0, pos));
        if (pos <= 0) {
          deleting = false;
          index = (index + 1) % PHRASES.length;
        }
        timer = setTimeout(tick, 26);
        return;
      }
      const next = PHRASES[index];
      pos += 1;
      setText(next.slice(0, pos));
      if (pos >= next.length) {
        deleting = true;
        timer = setTimeout(tick, 2300);
      } else {
        timer = setTimeout(tick, 48 + Math.random() * 40);
      }
    }
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="role-ticker">
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
      <span className="sr-only">{PHRASES.join(", ")}</span>
    </span>
  );
}
