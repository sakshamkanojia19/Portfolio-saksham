const items = [
  "AI Agents",
  "RAG Pipelines",
  "LangChain",
  "LangGraph",
  "Pinecone",
  "FastAPI",
  "Node.js",
  "React",
  "n8n",
  "OpenAI",
  "Claude",
  "Redis",
  "WebSockets",
  "Docker",
  "CI/CD",
];

const Row = ({ ariaHidden = false }) => (
  <ul
    aria-hidden={ariaHidden || undefined}
    className="flex shrink-0 items-center gap-10 pr-10"
  >
    {items.map((item) => (
      <li
        key={item}
        className="flex items-center gap-10 whitespace-nowrap font-display text-sm uppercase tracking-[0.25em] text-white/35"
      >
        {item}
        <span className="h-1 w-1 rounded-full bg-orange-400/60" aria-hidden="true" />
      </li>
    ))}
  </ul>
);

/**
 * Infinite tech ticker between hero and content. Pure CSS animation (two
 * copies, translate −50%), paused entirely under prefers-reduced-motion.
 */
const Marquee = () => {
  return (
    <div className="relative -mx-5 overflow-hidden border-y border-white/5 py-4 sm:-mx-8 lg:-mx-10">
      <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" aria-hidden="true" />
      <div className="animate-marquee flex w-max motion-reduce:animate-none">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
};

export default Marquee;
