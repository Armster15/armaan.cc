import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";

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
    tailwind(),
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
    }),
  ],
});
