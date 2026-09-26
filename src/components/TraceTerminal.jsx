import { m, useReducedMotion } from "framer-motion";

// Mirrors CollabDocs' actual permission-aware retrieval behaviour — the
// flagship "permissions before generation" principle, shown instead of told.
const LINES = [
  { text: '$ collabdocs ask "summarize the Q3 salary review notes"', tone: "cmd" },
  { text: "→ retrieving… 12 chunks matched", tone: "dim" },
  { text: "✗ 9 chunks dropped — viewer lacks ACL access", tone: "warn" },
  { text: "✓ context built from 3 authorized chunks only", tone: "ok" },
  { text: "✓ answer generated · grounded · 2 citations attached", tone: "ok" },
  { text: "# unauthorized content never reached the model", tone: "comment" },
];

const toneClass = {
  cmd: "text-ink",
  dim: "text-ink-3",
  warn: "text-accent",
  ok: "text-ok",
  comment: "text-ink-4 italic",
};

/**
 * Terminal panel that "runs" a permission-aware RAG query as it scrolls into
 * view.
 *
 * The stagger was 0.5s per line at a 60% visibility threshold — 2.5s before
 * the payoff line, by which point most readers had already scrolled past it.
 * It now starts as soon as a fifth of the panel is visible and resolves in
 * well under a second.
 */
const TraceTerminal = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-md border border-line bg-[#0c0c0c]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/12" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-white/12" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-white/12" aria-hidden="true" />
        <span className="ml-2 font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
          permission-aware RAG — live trace
        </span>
      </div>

      <div className="space-y-1.5 overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5">
        {LINES.map((line, index) => (
          <m.p
            key={line.text}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.25, delay: index * 0.11, ease: "easeOut" }}
            className={`whitespace-nowrap ${toneClass[line.tone]}`}
          >
            {line.text}
            {index === LINES.length - 1 && (
              <m.span
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                className="ml-1 inline-block h-3 w-[7px] translate-y-[1px] bg-accent"
              />
            )}
          </m.p>
        ))}
      </div>
    </div>
  );
};

export default TraceTerminal;
