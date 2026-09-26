import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { WORK_WITH_ME } from "../constants";
import { Button } from "./ui/button";
import { SpotlightCard } from "./ui/card";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const CtaLink = ({ cta, variant }) =>
  cta.external ? (
    <Button asChild variant={variant} size="sm">
      <a href={cta.href} target="_blank" rel="noopener noreferrer">
        {cta.label}
        <FiArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  ) : (
    <Button asChild variant={variant} size="sm">
      <Link to={cta.href}>{cta.label}</Link>
    </Button>
  );

/**
 * Audience-targeted next steps. Only the middle lane gets the amber primary
 * button — three primaries side by side is three ways of saying nothing.
 */
const WorkWithMe = ({ showHeading = true }) => (
  <section
    aria-labelledby={showHeading ? "work-with-me-heading" : undefined}
    className="space-y-[var(--gap-block)]"
  >
    {showHeading && (
      <SectionHeading
        id="work-with-me-heading"
        eyebrow="Work With Me"
        title="Whoever you are, there's a next step."
        lede="Different visitors need different things — pick your lane."
      />
    )}

    <div className="grid gap-5 lg:grid-cols-3">
      {WORK_WITH_ME.map((item, index) => (
        <Reveal key={item.audience} delay={index * 0.06} className="h-full">
          <SpotlightCard className="h-full p-6 sm:p-7">
            <p className="eyebrow">
              <span className="tok">{"// "}</span>
              for {item.audience.toLowerCase()}
            </p>

            <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-2">
              {item.pitch}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
              <CtaLink cta={item.cta} variant={index === 1 ? "primary" : "subtle"} />
              <CtaLink cta={item.secondary} variant="ghost" />
            </div>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  </section>
);

export default WorkWithMe;
