import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import Technologies from "../components/Technologies";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import { Separator } from "../components/ui/separator";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const disableReveal = prefersReducedMotion || isMobile;

  return (
    <div className="space-y-20">
      <Hero />
      <Separator />
      <motion.div
        variants={sectionVariants}
        initial={disableReveal ? false : "hidden"}
        animate={disableReveal ? "visible" : undefined}
        whileInView={disableReveal ? undefined : "visible"}
        viewport={disableReveal ? undefined : { once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <About />
      </motion.div>
      <Separator />
      <motion.div
        variants={sectionVariants}
        initial={disableReveal ? false : "hidden"}
        animate={disableReveal ? "visible" : undefined}
        whileInView={disableReveal ? undefined : "visible"}
        viewport={disableReveal ? undefined : { once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Technologies />
      </motion.div>
      <Separator />
      <motion.div
        variants={sectionVariants}
        initial={disableReveal ? false : "hidden"}
        animate={disableReveal ? "visible" : undefined}
        whileInView={disableReveal ? undefined : "visible"}
        viewport={disableReveal ? undefined : { once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Projects />
      </motion.div>
      <Separator />
      <motion.div
        variants={sectionVariants}
        initial={disableReveal ? false : "hidden"}
        animate={disableReveal ? "visible" : undefined}
        whileInView={disableReveal ? undefined : "visible"}
        viewport={disableReveal ? undefined : { once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Experience />
      </motion.div>
      <Separator />
      <motion.div
        variants={sectionVariants}
        initial={disableReveal ? false : "hidden"}
        animate={disableReveal ? "visible" : undefined}
        whileInView={disableReveal ? undefined : "visible"}
        viewport={disableReveal ? undefined : { once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Contact />
      </motion.div>
    </div>
  );
};

export default Home;
