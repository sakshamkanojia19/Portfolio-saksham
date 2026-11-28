"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import useMotionPreference from "./useMotionPreference";

// The final value is server rendered and remains the accessible text throughout.
export default function CountUp({ value, delay = 0 }) {
  const ref = useRef(null);
  const entered = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useMotionPreference();
  const match = String(value).match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? Number(match[2]) : null;
  const decimals = match?.[2].split(".")[1]?.length || 0;
  const [current, setCurrent] = useState(target);
  const [running, setRunning] = useState(false);
  const completed = useRef(false);

  useEffect(() => {
    if (target === null || !entered) return;
    if (reduce || completed.current) {
      setCurrent(target);
      setRunning(false);
      return;
    }
    setCurrent(0);
    setRunning(true);
    const controls = animate(0, target, {
      duration: 1.6, delay, ease: [0.22, 1, 0.36, 1],
      onUpdate: setCurrent,
      onComplete: () => { completed.current = true; setRunning(false); setCurrent(target); },
    });
    return () => controls.stop();
  }, [entered, reduce, target, delay]);

  const shown = match ? `${match[1]}${Number(current ?? target).toFixed(decimals)}${match[3]}` : value;
  return (
    <span ref={ref} className="count-up" data-count-running={running}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
