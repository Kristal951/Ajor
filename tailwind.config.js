/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       colors: {
        primary: "#4CAF50",
        secondary: "#00000",
        accent: "#333333",
      },
      fontFamily: {
        geist: ["Geist-Regular", "sans-serif"],
        geistBold: ["Geist-Bold", "sans-serif"],
        katanmruy: ["Katanmruy-Regular", "sans-serif"],
        katanmruyBold: ["Katanmruy-Bold", "sans-serif"],
      },
      fontSize: {
        bold: "32px",
        normal: "18px",
        small: "16px"
      },
    },
  },
  plugins: [],
};
