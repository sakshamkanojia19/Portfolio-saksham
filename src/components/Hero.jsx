import { m, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
// 680x680 WebP (18 KB) generated from profilepic.png (944 KB) — the LCP image.
import profilePic from "../assets/profilepic.webp";
import { PROFILE, PROOF, RESUME_URL } from "../constants";
import { Button } from "./ui/button";
import RotatingText from "./RotatingText";
import Counter from "./Counter";
import { EASE } from "./Reveal";

const BUILDING = [
  "agentic workflows",
  "RAG pipelines",
  "internal SaaS platforms",
  "AI chatbot systems",
  "automation pipelines",
];

/**
 * Hero.
 *
 * Rebuilt around three corrections to the previous version:
 *
 * 1. The <h1> is the proposition, not the name. "Saksham Kanojia" set at 60px
 *    told a scanning recruiter nothing; what he *does* now occupies that slot,
 *    and the name sits in the portrait caption where it belongs.
 * 2. The proof is above the fold. The 60% / 5+ / 0→1 figures are the most
 *    persuasive content on the site and they used to live halfway down the
 *    About section.
 * 3. The portrait is a monochrome plate, not a circle inside a purple-to-orange
 *    blur. It also no longer fades independently of the text column on scroll,
 *    which used to visibly de-sync the two halves.
 *
 * The pointer spotlight that used to be scoped to this section now lives in
 * <CursorGlow /> at the app level, so the light follows across the whole site
 * instead of dying at the hero's edges.
 */
const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const line = (i) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { y: "112%" },
          animate: { y: 0 },
          transition: { duration: 1, delay: 0.1 + i * 0.09, ease: EASE },
        };

  const fade = (delay) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section aria-labelledby="hero-heading" className="relative">
      <div className="relative grid items-end gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <div>
          <m.p
            {...fade(0)}
            className="flex items-center gap-2.5 font-mono text-xs text-ink-3"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
            </span>
            {PROFILE.availability}
          </m.p>

          <h1 id="hero-heading" className="mt-6 text-4xl">
            {PROFILE.proposition.map((text, i) => (
              <span key={text} className="line-mask">
                <m.span className="block" {...line(i)}>
                  {/* Only the payload word carries the accent — one amber
                      moment in the headline, not a gradient across all of it. */}
                  {i === PROFILE.proposition.length - 1 ? (
                    <span className="text-accent">{text}</span>
                  ) : (
                    text
                  )}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p
            {...fade(0.5)}
            className="mt-7 max-w-measure text-lg text-ink-2"
          >
            {PROFILE.tagline}
          </m.p>

          <m.p {...fade(0.58)} className="mt-4 font-mono text-xs text-ink-3">
            <span className="text-ink-4">{"> "}</span>
            currently building{" "}
            <RotatingText items={BUILDING} className="text-accent" />
          </m.p>

          <m.div {...fade(0.66)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/projects">
                See the work
                <FiArrowDownRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="subtle" size="lg">
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                Resume
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </Button>

            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />

            <div className="flex items-center gap-1">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-3 transition-colors hover:bg-white/[0.06] hover:text-ink"
              >
                <FaLinkedin aria-hidden="true" />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-3 transition-colors hover:bg-white/[0.06] hover:text-ink"
              >
                <FaGithub aria-hidden="true" />
              </a>
            </div>
          </m.div>
        </div>

        {/* Portrait.
            The source asset is already a circular composition on a light
            backdrop, so a rectangular plate exposed the baked-in disc edge and
            read as a broken crop. It stays a circle — but a monochrome one
            inside a hairline ring, not the old rainbow blur, and at roughly
            half the width so it no longer takes 45% of the hero for a photo. */}
        <m.figure
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="group relative mx-auto w-full max-w-[260px] lg:mx-0 lg:ml-auto"
        >
          <div className="relative aspect-square overflow-hidden rounded-full border border-line-strong">
            <img
              src={profilePic}
              alt={`Portrait of ${PROFILE.name}`}
              width="340"
              height="340"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full scale-[1.02] object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0 motion-reduce:transition-none"
            />
          </div>

          <figcaption className="mt-4 flex flex-col items-center gap-0.5 font-mono text-2xs text-ink-4 lg:items-end">
            <span className="text-ink-2">{PROFILE.name}</span>
            <span>{PROFILE.location}</span>
          </figcaption>
        </m.figure>

      </div>

      {/* Proof strip — the numbers, above the fold, where they earn their keep. */}
      <m.dl
        {...fade(0.8)}
        className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4"
      >
        {PROOF.map((item) => (
          <div key={item.label} className="group bg-bg p-5 transition-colors hover:bg-surface">
            <dd className="font-display text-2xl font-semibold text-ink">
              {item.count != null ? (
                <Counter value={item.count} suffix={item.suffix} />
              ) : (
                item.value
              )}
            </dd>
            <dt className="mt-1.5 text-sm font-medium text-ink-2">{item.label}</dt>
            <p className="mt-1 text-xs leading-relaxed text-ink-4">{item.detail}</p>
          </div>
        ))}
      </m.dl>
    </section>
  );
};

export default Hero;
