/** @type {import('tailwindcss').Config} */

// Everything resolves to a CSS custom property declared in src/index.css, so
// the palette has exactly one source of truth. Monochrome ink scale + a single
// amber accent — if a colour isn't in here, it doesn't belong on the site.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: {
          DEFAULT: "var(--ink-1)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
          4: "var(--ink-4)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          ink: "var(--accent-ink)",
        },
        danger: "var(--danger)",
        ok: "var(--ok)",
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Fluid scale — nothing jumps at a breakpoint any more.
        "2xs": ["var(--fs-2xs)", { lineHeight: "1.4" }],
        xs: ["var(--fs-xs)", { lineHeight: "1.5" }],
        sm: ["var(--fs-sm)", { lineHeight: "1.6" }],
        base: ["var(--fs-base)", { lineHeight: "1.65" }],
        lg: ["var(--fs-lg)", { lineHeight: "1.5" }],
        xl: ["var(--fs-xl)", { lineHeight: "1.35" }],
        "2xl": ["var(--fs-2xl)", { lineHeight: "1.2" }],
        "3xl": ["var(--fs-3xl)", { lineHeight: "1.06" }],
        "4xl": ["var(--fs-4xl)", { lineHeight: "0.98" }],
      },
      borderRadius: {
        xs: "var(--r-xs)",
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
      },
      maxWidth: {
        measure: "68ch",
        "measure-tight": "56ch",
        shell: "var(--shell)",
        "shell-wide": "var(--shell-wide)",
      },
      boxShadow: {
        e1: "var(--e1)",
        e2: "var(--e2)",
        e3: "var(--e3)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        spring: "var(--ease-spring)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%,-3%,0) scale(1.06)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        drift: "drift 26s var(--ease-out) infinite",
      },
    },
  },
  plugins: [],
};
