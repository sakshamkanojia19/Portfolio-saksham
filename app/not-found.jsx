import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container empty-state error-page">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>
        A path less travelled.
        <br />A little too far.
      </h1>
      <p>This page may have moved, or the article is not published.</p>
      <Link className="button primary" href="/">
        Back to home
      </Link>
    </div>
  );
}
