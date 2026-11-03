import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-deep": "var(--surface-deep)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "field-1": "var(--field-1)",
        "field-1-ink": "var(--field-1-ink)",
        nalar: {
          navy: "var(--nalar-navy)",
          teal: "var(--nalar-teal)",
          ink: "var(--nalar-ink)",
        },
      },
      fontFamily: {
        display: ["var(--font-spartan)", "sans-serif"],
        body: ["var(--font-figtree)", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};

export default config;
