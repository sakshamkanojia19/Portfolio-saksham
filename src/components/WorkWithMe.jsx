import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { WORK_WITH_ME } from "../constants";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
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
 * Audience-targeted CTAs — a recruiter, a founder, and a developer each get a
 * different next step instead of one generic "contact me".
 */
const WorkWithMe = ({ showHeading = true }) => {
  return (
    <section
      aria-labelledby={showHeading ? "work-with-me-heading" : undefined}
      aria-label={showHeading ? undefined : "Work with me"}
      className="space-y-8"
    >
      {showHeading && (
        <SectionHeading
          id="work-with-me-heading"
          eyebrow="Work With Me"
          title="Whoever you are, there's a next step."
          lede="Different visitors need different things — pick your lane."
        />
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {WORK_WITH_ME.map((item, index) => (
          <Reveal key={item.audience} delay={index * 0.08}>
            <Card className="flex h-full flex-col gap-4">
              <p className="font-mono text-xs text-orange-300">
                <span className="text-white/30">{"// "}</span>
                for {item.audience.toLowerCase()}
              </p>
              <p className="flex-1 text-sm leading-relaxed text-white/70">
                {item.pitch}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <CtaLink cta={item.cta} variant={index === 1 ? "gradient" : "outline"} />
                <CtaLink cta={item.secondary} variant="ghost" />
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default WorkWithMe;
