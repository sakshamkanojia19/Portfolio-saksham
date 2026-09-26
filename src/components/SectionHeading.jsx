import Reveal from "./Reveal";

/**
 * Eyebrow + title + lede, held to a readable measure.
 *
 * The oversized ghost numeral that used to sit behind section headings is
 * gone: at 128px it was 3.5x the size of the headline it decorated and, being
 * absolutely positioned, it overlapped the heading's right edge and the card
 * corners below it at narrower desktop widths.
 */
const SectionHeading = ({ eyebrow, title, lede, id }) => (
  <Reveal>
    <div className="max-w-measure space-y-3">
      {eyebrow && (
        <p className="eyebrow">
          <span className="tok">{"// "}</span>
          {eyebrow.toLowerCase()}
        </p>
      )}
      <h2 id={id} className="text-2xl">
        {title}
      </h2>
      {lede && <p className="text-base text-ink-3">{lede}</p>}
    </div>
  </Reveal>
);

export default SectionHeading;
