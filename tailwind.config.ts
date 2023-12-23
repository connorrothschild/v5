import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "1.5xl": "1.35rem",
      },
      fontFamily: {
        serif: ["ivypresto-display"],
        // serif: ["var(--font-nyght)"],
        // serif: ["var(--font-editorial-new)"],
        // serif: ["var(--font-times-now)"],
        // serif: ["var(--font-tobias)"],
        // serif: ["var(--font-canela)"],
        sans: ["var(--font-montreal)"],
        // sans: ["var(--font-manrope)"],
        // sans: ["var(--font-tasa-orbiter)"],
        // sans: ["var(--font-suisse)"],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
