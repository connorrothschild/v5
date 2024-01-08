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
      height: {
        screen: ["100vh", "100dvh", "100svh"],
      },
      minHeight: {
        screen: ["100vh", "100dvh", "100svh"],
      },
      fontFamily: {
        // serif: ["var(--font-tobias)"],
        serif: ["var(--font-nyght)"],
        // serif: ["ivypresto-display"],
        // serif: ["var(--font-montreal)"],
        // !! Sans is defined in app.tsx so that it can be used in global styles, including shadcn modals
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
