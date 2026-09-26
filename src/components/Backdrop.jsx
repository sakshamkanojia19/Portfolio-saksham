/**
 * Page backdrop.
 *
 * Replaces the old ParallaxBackground, which ran three scroll-linked
 * `blur-3xl` layers 400–520px wide. Three large blurred surfaces repainting on
 * every scroll frame was the site's main source of scroll jank on mid-range
 * phones, and it bought a depth effect nobody could consciously see.
 *
 * This version is entirely static + CSS: two very soft radial washes, a
 * masked grid, a top vignette and grain. Zero JS, zero scroll listeners, and
 * the drift animation is paused wholesale by the reduced-motion block.
 */
const Backdrop = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 grain" aria-hidden="true">
    <div className="absolute inset-0 bg-bg" />

    {/* A single warm wash, top-left, at very low opacity — the only place
        the accent hue appears outside of interactive elements. */}
    <div className="absolute -left-[15%] -top-[20%] h-[60vw] w-[60vw] animate-drift rounded-full bg-[radial-gradient(circle,rgba(255,138,61,0.07),transparent_62%)] blur-[80px] motion-reduce:animate-none" />

    {/* Cool counterweight, bottom-right, so the page isn't uniformly warm. */}
    <div className="absolute -bottom-[25%] -right-[10%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.045),transparent_60%)] blur-[90px]" />

    {/* Engineering grid. Masked to the centre so it never crowds the edges. */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />

    {/* Keeps the fixed header legible over bright content behind it. */}
    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
  </div>
);

export default Backdrop;
