import { motion, useReducedMotion } from "framer-motion";

// Mirrors CollabDocs' actual permission-aware retrieval behavior — the
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
  cmd: "text-white/90",
  dim: "text-white/50",
  warn: "text-orange-300/90",
  ok: "text-emerald-300/90",
  comment: "text-purple-300/70 italic",
};

/**
 * Terminal panel that "runs" a permission-aware RAG query line by line as it
 * scrolls into view. All lines render immediately under reduced motion.
 */
const TraceTerminal = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f]/90 shadow-[0_0_50px_rgba(168,85,247,0.10)]">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="ml-2 text-[11px] uppercase tracking-[0.2em] text-white/35">
          permission-aware RAG — live trace
        </span>
      </div>
      <div className="space-y-2 overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm">
        {LINES.map((line, index) => (
          <motion.p
            key={line.text}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.3, delay: index * 0.5, ease: "easeOut" }}
            className={`whitespace-nowrap ${toneClass[line.tone]}`}
          >
            {line.text}
            {index === LINES.length - 1 && (
              <motion.span
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-emerald-300/80"
              />
            )}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default TraceTerminal;
