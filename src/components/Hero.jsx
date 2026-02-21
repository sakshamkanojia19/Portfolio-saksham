import { motion } from "framer-motion";
import profilePic from "../assets/profilepic.png";
import { Button } from "./ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6 text-center lg:text-left">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.35em] text-orange-300"
        >
          Hello, I am
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
        >
          Saksham <span className="text-purple-400">Kanojia</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-white/70"
        >
          AI Automation Engineer | Full-Stack Developer | Generative AI
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-xl text-base text-white/70"
        >
          I build AI-driven products and automation systems with LLMs, RAG pipelines, and scalable Saas Products & workflows that deliver measurable impact.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 lg:justify-start"
        >
          <Button
            asChild
            variant="gradient"
            size="lg"
            className="shadow-[0_0_30px_rgba(249,115,22,0.35)]"
          >
            <a
              href="https://drive.google.com/file/d/1HU3OFt_xrgNpZb6StxV-GVMsQ1JVoc3G/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Hire Me</Link>
          </Button>
        </motion.div>
        <div className="flex items-center justify-center gap-4 text-xl text-white/70 lg:justify-start">
          <a
            href="https://www.linkedin.com/in/saksham-kanojia-7895b7217/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-orange-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/sakshamkanojia19"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-orange-300"
          >
            <FaGithub />
          </a>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto h-[320px] w-[320px] sm:h-[360px] sm:w-[360px]"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-orange-400 opacity-70 blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-black/70 p-3">
            <img
              src={profilePic}
              alt="Saksham Kanojia"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
