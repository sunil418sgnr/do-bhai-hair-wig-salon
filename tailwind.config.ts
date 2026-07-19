import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        charcoal: "#141311",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E9CE6E",
          dim: "#8A7328",
          soft: "#F3E4B8",
        },
        bone: "#F6F3EC",
        smoke: "#B9B4A8",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        "gold-radial": "radial-gradient(circle at center, rgba(212,175,55,0.15), transparent 70%)",
      },
      boxShadow: {
        gold: "0 0 40px rgba(212,175,55,0.15)",
        card: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
