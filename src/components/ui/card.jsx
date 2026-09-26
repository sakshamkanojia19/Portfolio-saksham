import { useCallback, useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * Flat, hairline-bordered surface. No coloured glow (eight of those in a grid
 * used to bleed into one purple wash) and no hover-lift — depth now comes from
 * the border and a single elevation token.
 */
const Card = ({ className, as: Tag = "div", ...props }) => (
  <Tag
    className={cn(
      "relative rounded-lg border border-line bg-surface/70 p-6 backdrop-blur-sm",
      "edge-hover hover:border-line-strong",
      className
    )}
    {...props}
  />
);

/**
 * Card that tracks the pointer and paints a soft radial highlight under it.
 * The gradient lives in CSS (`.spotlight`) and we only write two custom
 * properties, so this never triggers a React render while the mouse moves.
 * Falls back to a plain Card behaviour on touch — no pointer, no spotlight.
 */
const SpotlightCard = ({ className, as: Tag = "div", children, ...props }) => {
  const ref = useRef(null);

  const onPointerMove = useCallback((event) => {
    if (event.pointerType === "touch") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "spotlight relative overflow-hidden rounded-lg border border-line bg-surface/70 p-6 backdrop-blur-sm",
        "edge-hover hover:border-line-strong",
        className
      )}
      {...props}
    >
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Tag>
  );
};

export { Card, SpotlightCard };
