import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0f14",
        porcelain: "#f6f4f2",
        surgical: "#0f6ea6",
        vein: "#b85a6a",
      },
      fontFamily: {
        display: ["var(--font-playfair)"],
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};

export default config;

