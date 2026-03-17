/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slateDeep: "#07131a",
        slateSoft: "#0c1b24",
        mintGlow: "#7df2ca",
        cyanGlow: "#5cd8f4",
        amberGlow: "#f5c46d"
      },
      boxShadow: {
        panel: "0 24px 70px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};
