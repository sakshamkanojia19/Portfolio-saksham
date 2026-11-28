// Fixed background: a faint orange glow from the top and a dot grid that
// fades out. CSS only; purely decorative.
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="bd-glow" />
      <div className="bd-dots" />
    </div>
  );
}
