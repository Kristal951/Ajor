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
        accent: "#EBEBEB",
        accent2: "#66666",
        Bg: '#F3F3F5',
        disabled: 'C6C6C6'
      },
      fontFamily: {
        geist: ["Geist-Regular", "sans-serif"],
        geistBold: ["Geist-Bold", "sans-serif"],
        geistSemiBold: ["Geist-SemiBold", "sans-serif"],
        katanmruy: ["Katanmruy-Regular", "sans-serif"],
        katanmruyBold: ["Katanmruy-Bold", "sans-serif"],
        KatanmruySemiBold: ["Katanmruy-SemiBold", "sans-serif"],
      },
      fontSize: {
        bold: "32px",
        semiBold: "24px",
        normal: "18px",
        small: "16px"
      },
    },
  },
  plugins: [],
};
