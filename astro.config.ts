import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://armaan.cc",
  trailingSlash: "never",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  redirects: {
    "/projects": "/work",
  },
  integrations: [
    icon(),
    expressiveCode({
      // remove box shadow from code snippets
      styleOverrides: {
        frames: {
          frameBoxShadowCssValue: "",
        },
      },
      themes: ["github-light"],
      useDarkModeMediaQuery: false,
    }),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      // all pages except /stonks
      filter: (page) => {
        const { pathname } = new URL(page);
        return !pathname.startsWith("/stonks");
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
