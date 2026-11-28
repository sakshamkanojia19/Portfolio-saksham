"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import useMotionPreference from "./useMotionPreference";

const Depth = createContext({ background: 0, portrait: 0 });

export function HeroMotion({ children }) {
  const target = useRef(null);
  const reduce = useMotionPreference();
  const [desktop, setDesktop] = useState(false);
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] });
  const background = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const portrait = useTransform(scrollYProgress, [0, 1], [0, -60]);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 821px) and (pointer: fine)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const active = desktop && !reduce;
  return (
    <Depth.Provider value={{ background: active ? background : 0, portrait: active ? portrait : 0 }}>
      <section ref={target} className="hero" aria-labelledby="hero-heading" data-parallax={active}>
        {children}
      </section>
    </Depth.Provider>
  );
}

export function HeroLayer({ layer, className, children }) {
  const depth = useContext(Depth);
  return <motion.div className={className} style={{ y: depth[layer] }} data-depth={layer}>{children}</motion.div>;
}
