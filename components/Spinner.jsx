// Small gradient ring spinner for buttons and inline busy states.
// Decorative only — the button's text carries the accessible label.
export default function Spinner({ className = "" }) {
  return <span className={`spinner ${className}`} aria-hidden="true" />;
}
