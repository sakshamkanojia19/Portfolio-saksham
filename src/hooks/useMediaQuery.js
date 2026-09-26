import { useEffect, useState } from "react";

/**
 * Resolves synchronously on the first render. Framer latches whatever
 * `initial` it sees on mount, so a hook that reported the wrong value for one
 * frame used to strand elements at opacity 0 permanently.
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
};

export default useMediaQuery;
