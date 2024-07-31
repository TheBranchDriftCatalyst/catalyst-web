// import theme from "@/catalyst-ui/theme";
import theme from "./@catalyst-ui/lib/theme";


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
   /**
   * Tailwind postcss scans these for class names to generate.
   * Forgetting this is slightly annoying. We have two entry points
   * because catalyst web uses catalyst-ui as a direct dependency,
   * which makes the DX much better compared to using yarn link.
   * This is also synced with the two ts.configs for each project,
   * so imports sync correctly and the Abstract Syntax Tree (AST)
   * is traversable more clearly and quickly in IntelliSense.
   */
    "./src/app/**/*.{ts,tsx}",
    "./@catalyst-ui/lib/**/*.{ts,tsx}"
  ],
  theme: theme,
  plugins: [require("tailwindcss-animate")],
};
