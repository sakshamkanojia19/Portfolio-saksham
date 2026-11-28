"use client";
import { useEffect, useRef } from "react";
import useMotionPreference from "../motion/useMotionPreference";

// "AI strings": thin cubic Bézier threads that drift slowly, bend away from
// the cursor, and carry small token dots along their length. Colours come
// from CSS variables (--thread, --thread-node, --thread-token). Decorative
// only: pauses off-screen / in background tabs, still frame for reduced motion.
const THREADS = 16;
const TOKENS = 22;

function bezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return (
    u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
  );
}

export default function HeroField() {
  const ref = useRef(null);
  const reducedMotion = useMotionPreference();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const reduce = reducedMotion;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let colors = {};
    const mouse = { x: -9999, y: -9999, active: false };

    const seeds = Array.from({ length: THREADS }, (_, i) => ({
      y0: 0.08 + (i / THREADS) * 0.9,
      y1: 0.02 + ((i * 7) % THREADS) / THREADS,
      phase: i * 1.37,
      speed: 0.00018 + (i % 5) * 0.00004,
      amp: 0.1 + (i % 4) * 0.035,
      hot: i % 5 === 2,
    }));
    const tokens = Array.from({ length: TOKENS }, (_, i) => ({
      thread: (i * 5) % THREADS,
      t: (i * 0.137) % 1,
      v: 0.0009 + (i % 4) * 0.00035,
    }));

    function readColors() {
      const s = getComputedStyle(document.documentElement);
      colors = {
        line: s.getPropertyValue("--thread").trim() || "rgba(244,244,245,.1)",
        node: s.getPropertyValue("--thread-node").trim() || "#3f3f46",
        token: s.getPropertyValue("--thread-token").trim() || "#f97316",
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function curve(seed, now) {
      const wave = Math.sin(now * seed.speed + seed.phase);
      const wave2 = Math.cos(now * seed.speed * 1.3 + seed.phase * 0.7);
      const pts = {
        x0: -w * 0.05,
        y0: seed.y0 * h,
        x1: w * 0.32,
        y1: (seed.y0 + wave * seed.amp) * h,
        x2: w * 0.68,
        y2: (seed.y1 - wave2 * seed.amp) * h,
        x3: w * 1.05,
        y3: seed.y1 * h,
      };
      if (mouse.active) {
        for (const k of ["1", "2"]) {
          const dx = pts[`x${k}`] - mouse.x;
          const dy = pts[`y${k}`] - mouse.y;
          const d = Math.hypot(dx, dy);
          const reach = Math.min(w, h) * 0.45;
          if (d < reach) {
            const push = (1 - d / reach) ** 2 * 70;
            pts[`y${k}`] += (dy / (d || 1)) * push;
          }
        }
      }
      return pts;
    }

    function point(c, t) {
      return [
        bezier(c.x0, c.x1, c.x2, c.x3, t),
        bezier(c.y0, c.y1, c.y2, c.y3, t),
      ];
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h);
      const curves = seeds.map((s) => curve(s, now));
      ctx.lineWidth = 1;
      curves.forEach((c, i) => {
        ctx.beginPath();
        ctx.moveTo(c.x0, c.y0);
        ctx.bezierCurveTo(c.x1, c.y1, c.x2, c.y2, c.x3, c.y3);
        ctx.strokeStyle = colors.line;
        ctx.globalAlpha = seeds[i].hot ? 1 : 0.7;
        ctx.stroke();
        for (const t of [0.22, 0.5, 0.78]) {
          const [x, y] = point(c, t);
          const near =
            mouse.active && Math.hypot(x - mouse.x, y - mouse.y) < 90;
          ctx.globalAlpha = 1;
          ctx.fillStyle = near ? colors.token : colors.node;
          ctx.beginPath();
          ctx.arc(x, y, near ? 2.4 : 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.fillStyle = colors.token;
      for (const tok of tokens) {
        const [x, y] = point(curves[tok.thread], tok.t);
        ctx.globalAlpha = 0.25 + 0.75 * Math.sin(Math.PI * tok.t);
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function loop(now) {
      raf = 0;
      if (!visible || document.hidden) return;
      for (const tok of tokens) {
        tok.t += tok.v;
        if (tok.t > 1) tok.t -= 1;
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (!raf && !reduce && visible && !document.hidden)
        raf = requestAnimationFrame(loop);
    }

    readColors();
    resize();
    draw(performance.now());
    start();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const themeWatch = new MutationObserver(() => {
      readColors();
      if (reduce) draw(performance.now());
    });
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    function onResize() {
      resize();
      draw(performance.now());
    }
    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x > -80 && mouse.x < w + 80 && mouse.y > -80 && mouse.y < h + 80;
    }
    function onLeave() {
      mouse.active = false;
    }
    function onVisibility() {
      if (!document.hidden) start();
    }
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeWatch.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}
