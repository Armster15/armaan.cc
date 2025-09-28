import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Satoshi Variable", ...defaultTheme.fontFamily.sans] },
      screens: {
        xxs: "335px",
        xs: "400px",
      },
      colors: {
        "armaan-red": "#ff2928",
        "armaan-blue": "#1e9afe",
        "armaan-purple": "#7b1ea2",
        "bessy-purple-light": "#E3C7FF",
        "bessy-purple": "#8A15FF",
        subtitle: "#525252",
        "subtitle-light": "#525252" + "80", // opacity
        "page-bg": "#fefcf8",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
