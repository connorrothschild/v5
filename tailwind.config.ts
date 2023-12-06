import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "1.5xl": "1.35rem",
      },
      fontFamily: {
        // serif: ["ivypresto-display"],
        serif: ["var(--font-nyght)"],
        // serif: ["var(--font-editorial-new)"],
        // serif: ["var(--font-times-now)"],
        // serif: ["var(--font-tobias)"],
        // serif: ["var(--font-canela)"],
        // sans: ["var(--font-manrope)"],
        sans: ["var(--font-tasa-orbiter)"],
        // sans: ["var(--font-suisse)"],
      },
    },
  },
  plugins: [],
};
export default config;
