import { m, useReducedMotion } from "framer-motion";
import { PROFILE } from "../constants";
import { EASE } from "./Reveal";

/**
 * The signature line, given the room it deserves.
 *
 * This is the strongest sentence on the site and it used to sit inside a
 * gradient-bordered box below the fold, competing with two other sentences
 * that said roughly the same thing. Here it's the only thing on screen.
 */
const Statement = () => {
  const prefersReducedMotion = useReducedMotion();
  const words = PROFILE.signatureLines[0].split(" ");

  return (
    <section aria-label="Statement" className="py-[var(--gap-block)]">
      <blockquote className="mx-auto max-w-4xl text-center">
        <p className="font-display text-2xl font-semibold leading-[1.25] tracking-[-0.03em] text-ink">
          {words.map((word, i) => (
            <m.span
              key={`${word}-${i}`}
              initial={prefersReducedMotion ? false : { opacity: 0.12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.035, ease: EASE }}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </m.span>
          ))}
        </p>
        <footer className="mt-6 font-mono text-2xs uppercase tracking-[0.18em] text-ink-4">
          {PROFILE.signatureLines[1]}
        </footer>
      </blockquote>
    </section>
  );
};

export default Statement;
