import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // serif: ["var(--font-times-now)"],
        // serif: ["var(--font-tobias)"],
        serif: ["ivypresto-display"],
        // sans: ["var(--font-suisse)"],
        sans: ["var(--font-manrope)"],
        // sans: ["ivypresto-display"],
      },
    },
  },
  plugins: [],
};
export default config;
