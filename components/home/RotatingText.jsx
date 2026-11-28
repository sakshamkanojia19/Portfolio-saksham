"use client";
import { useEffect, useState } from "react";
import useMotionPreference from "../motion/useMotionPreference";

// Cycles through short phrases. Shows the first one without JavaScript and
// stays still for visitors who prefer reduced motion.
export default function RotatingText({ items, interval = 2400 }) {
  const [i, setI] = useState(0);
  const reduce = useMotionPreference();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval, reduce]);
  return (
    <span className="rotating" key={i}>
      {items[i]}
    </span>
  );
}
