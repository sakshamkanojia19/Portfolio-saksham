/**
 * Shared eyebrow + title + optional lede used by every home-page section so the
 * rhythm stays identical across old and new sections. The eyebrow renders as a
 * lowercase code comment (`// skills`) — the site's developer signature.
 */
const SectionHeading = ({ eyebrow, title, lede, accent = "orange", id }) => {
  const eyebrowColor =
    accent === "purple" ? "text-purple-300" : "text-orange-300";

  return (
    <div className="max-w-3xl space-y-3">
      {eyebrow && (
        <p className={`font-mono text-xs sm:text-sm ${eyebrowColor}`}>
          <span className="text-white/30">{"// "}</span>
          {eyebrow.toLowerCase()}
        </p>
      )}
      <h2
        id={id}
        className="section-title font-display text-2xl leading-tight sm:text-3xl lg:text-4xl"
      >
        {title}
      </h2>
      {lede && <p className="text-sm text-white/65 sm:text-base">{lede}</p>}
    </div>
  );
};

export default SectionHeading;
