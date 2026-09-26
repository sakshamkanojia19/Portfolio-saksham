import { useEffect } from "react";

/**
 * Freezes background scrolling while an overlay is open.
 *
 * The old mobile menu was a bare `hidden` toggle, so the page kept scrolling
 * underneath the open panel. Padding compensates for the scrollbar's width so
 * the layout doesn't jolt sideways at the moment the lock engages.
 */
const useScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
};

export default useScrollLock;
