// Shared heading with a quiet label and an optional destination link.
export default function SectionHead({ label, id, title, note, aside }) {
  return (
    <div className="sec-head" data-reveal>
      <div className="sec-main">
        <p className="sec-label">{label}</p>
        <h2 id={id}>{title}</h2>
        {note && <p className="sec-note">{note}</p>}
      </div>
      {aside && <div className="sec-aside">{aside}</div>}
    </div>
  );
}
