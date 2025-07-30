/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // Enables toggling via class
  theme: {
    extend: {
      spacing: {
        50: "50vw",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
