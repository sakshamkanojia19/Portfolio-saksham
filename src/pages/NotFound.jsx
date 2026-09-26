import { Link, useLocation } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { NAV } from "../constants";
import { Button } from "../components/ui/button";
import useDocumentMeta from "../hooks/useDocumentMeta";

/**
 * A real 404. The previous catch-all route silently rendered the homepage,
 * so a mistyped URL looked like it had worked while the address bar still
 * showed a path that doesn't exist.
 */
const NotFound = () => {
  const { pathname } = useLocation();

  useDocumentMeta(
    "Page not found — Saksham Kanojia",
    "That page doesn't exist. Here's everything that does."
  );

  return (
    <div className="flex min-h-[55vh] flex-col justify-center">
      <p className="eyebrow">
        <span className="tok">~/</span>404
      </p>

      <h1 className="mt-5 max-w-[14ch] text-3xl">That page doesn&apos;t exist.</h1>

      <p className="mt-5 max-w-measure text-base text-ink-2">
        Nothing is served at{" "}
        <code className="rounded-xs border border-line bg-surface px-1.5 py-0.5 font-mono text-sm text-ink">
          {pathname}
        </code>
        . It may have moved, or the link may be wrong.
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/">
            Back to home
            <FiArrowRight aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="subtle" size="lg">
          <Link to="/projects">See the work</Link>
        </Button>
      </div>

      <nav aria-label="All pages" className="mt-14 border-t border-line pt-6">
        <h2 className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
          Everything on this site
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
          {NAV.filter((item) => item.to !== "/").map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="text-sm text-ink-3 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NotFound;
