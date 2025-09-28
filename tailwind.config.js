import defaultTheme from "tailwindcss/defaultTheme";

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
