import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
// 680x680 WebP (18 KB) generated from profilepic.png (944 KB) — this is the LCP
// image, and the original was ~50x larger than the rendered size needed.
import profilePic from "../assets/profilepic.webp";
import { PROFILE, RESUME_URL } from "../constants";
import { Button } from "./ui/button";
import RotatingText from "./RotatingText";

// All true — what actually gets built week to week.
const BUILDING = [
  "agentic workflows",
  "RAG pipelines",
  "internal SaaS platforms",
  "AI chatbot systems",
  "automation pipelines",
];

const fadeUp = (delay, disabled) =>
  disabled
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: "easeOut" },
      };

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  // Parallax planes: as the hero scrolls away, the portrait sinks slightly
  // while the pull-quote lifts — two speeds, gentle depth.
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, 90]);
  const quoteY = useTransform(scrollY, [0, 700], [0, -50]);
  const heroFade = useTransform(scrollY, [0, 500], [1, 0.35]);

  return (
    <section aria-labelledby="hero-heading" className="relative">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="space-y-6 text-center lg:text-left">
          <motion.p
            {...fadeUp(0, prefersReducedMotion)}
            className="flex items-center justify-center gap-2 font-mono text-xs text-white/50 sm:text-sm lg:justify-start"
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none"
              aria-hidden="true"
            />
            open to roles & projects
          </motion.p>

          <motion.h1
            id="hero-heading"
            {...fadeUp(0.08, prefersReducedMotion)}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {PROFILE.firstName}{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
              {PROFILE.lastName}
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16, prefersReducedMotion)}
            className="text-base text-white/75 sm:text-lg"
          >
            {PROFILE.title}
          </motion.p>

          <motion.p
            {...fadeUp(0.24, prefersReducedMotion)}
            className="mx-auto max-w-xl text-sm leading-relaxed text-white/65 sm:text-base lg:mx-0"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.p
            {...fadeUp(0.28, prefersReducedMotion)}
            className="font-mono text-xs text-white/45 sm:text-sm"
          >
            <span className="text-purple-300" aria-hidden="true">
              &gt;{" "}
            </span>
            currently building{" "}
            <RotatingText items={BUILDING} className="font-semibold text-orange-300" />
          </motion.p>

          <motion.div
            {...fadeUp(0.32, prefersReducedMotion)}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            <Button
              asChild
              variant="gradient"
              size="lg"
              className="shadow-[0_0_30px_rgba(249,115,22,0.35)]"
            >
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                <FiDownload aria-hidden="true" />
                Download Resume
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Hire Me
                <FiArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp(0.4, prefersReducedMotion)}
            className="flex items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white/70 transition hover:border-orange-300/50 hover:text-orange-300"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white/70 transition hover:border-orange-300/50 hover:text-orange-300"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <span className="ml-1 text-xs text-white/45">{PROFILE.location}</span>
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={prefersReducedMotion ? undefined : { y: portraitY, opacity: heroFade }}
          className="relative mx-auto h-[260px] w-[260px] sm:h-[340px] sm:w-[340px]"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-orange-400 opacity-70 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-black/70 p-3">
              <img
                src={profilePic}
                alt="Portrait of Saksham Kanojia"
                width="340"
                height="340"
                loading="eager"
                decoding="async"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.blockquote
        {...fadeUp(0.48, prefersReducedMotion)}
        style={prefersReducedMotion ? undefined : { y: quoteY }}
        className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/5 to-orange-400/10 p-6 sm:p-8"
      >
        <span
          className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-400 to-orange-400"
          aria-hidden="true"
        />
        <p className="font-display text-lg font-semibold leading-snug text-white sm:text-2xl">
          “{PROFILE.signatureLines[0]}”
        </p>
        <footer className="mt-3 text-xs uppercase tracking-[0.25em] text-white/45">
          {PROFILE.signatureLines[1]}
        </footer>
      </motion.blockquote>

      <motion.a
        href="#about"
        {...fadeUp(0.8, prefersReducedMotion)}
        className="mt-10 hidden items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/35 transition hover:text-orange-300 lg:flex"
      >
        Scroll
        <motion.span
          aria-hidden="true"
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
};

export default Hero;
