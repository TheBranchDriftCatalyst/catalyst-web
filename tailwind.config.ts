import { catalystTwTheme } from "catalyst-ui";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './app/**/*.{ts,tsx}',
	],
  theme: catalystTwTheme,
  plugins: [require("tailwindcss-animate")],
}