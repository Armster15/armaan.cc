import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter Variable", ...defaultTheme.fontFamily.sans] },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
