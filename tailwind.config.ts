import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#e8eef2",
        slateDeep: "#08141b",
        slateSoft: "#0f1e27",
        cyanGlow: "#5ce1e6",
        mintGlow: "#74f0c1",
        goldGlow: "#f5bf74",
        roseGlow: "#f08787"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0, 0, 0, 0.32)"
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(92, 225, 230, 0.16), transparent 28%), radial-gradient(circle at top right, rgba(245, 191, 116, 0.14), transparent 24%), linear-gradient(180deg, #07131a 0%, #091921 42%, #071119 100%)"
      }
    }
  },
  plugins: []
};

export default config;
