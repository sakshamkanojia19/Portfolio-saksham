"use client";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function currentPreference() {
  return window.matchMedia(QUERY).matches;
}

export default function useMotionPreference() {
  // Server output is static; browser preferences are read after hydration.
  return useSyncExternalStore(subscribe, currentPreference, () => true);
}
