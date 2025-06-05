import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter Variable", ...defaultTheme.fontFamily.sans] },
      screens: {
        xs: "335px",
      },
      colors: {
        "armaan-red": "#ff2928",
        "armaan-blue": "#1e9afe",
        "armaan-purple": "#7b1ea2",
        "bessy-purple-light": "#E3C7FF",
        "bessy-purple": "#8A15FF",
        subtitle: colors["gray"]["600"],
        "subtitle-light": colors["gray"]["600"] + "80", // opacity
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
