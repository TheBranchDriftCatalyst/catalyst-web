// import theme from "@/catalyst-ui/catalystTailwindTheme";
import theme from "./@catalyst-ui/lib/catalystTailwindTheme";


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    // Tailwind postcss scans these fore class names to generate.
    // forgetting this is slightly annoying.  We have two entry points
    // cause catalyst web uses catalyst-ui as a direct dependency, this
    // makes the DX much better.  This is also synced with the two ts.configs for each project.
    // so imports sync correctly and the AST is traversable more clearly in intellisense.
    "./src/app/**/*.{ts,tsx}",
    "./@catalyst-ui/lib/**/*.{ts,tsx}"
  ],
  theme: theme,
  plugins: [require("tailwindcss-animate")],
};
