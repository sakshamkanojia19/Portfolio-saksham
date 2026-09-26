import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { RESUME_URL } from "../constants";
import { Button } from "./ui/button";
import Reveal from "./Reveal";

/**
 * Closing call to action. Every page ends with one so a visitor never reaches
 * a dead end — but the full form lives only on /contact, so the same form
 * isn't rendered five times across the site.
 */
const CtaBand = ({
  title = "Have a workflow that should run itself?",
  body = "Tell me what's manual today and I'll map the system that replaces it.",
}) => (
  <Reveal>
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden rounded-lg border border-line bg-surface/60 px-7 py-12 sm:px-12 sm:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,138,61,0.10),transparent_65%)] blur-2xl"
      />

      <div className="relative max-w-measure">
        <h2 id="cta-heading" className="text-2xl">
          {title}
        </h2>
        <p className="mt-4 text-base text-ink-2">{body}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link to="/contact">
              Start a conversation
              <FiArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="subtle" size="lg">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              Resume
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>

      </div>
    </section>
  </Reveal>
);

export default CtaBand;
