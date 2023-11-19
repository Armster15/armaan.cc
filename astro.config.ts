import type { Plugin } from "vite";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { readFileSync } from "node:fs";

// https://astro.build/config
export default defineConfig({
  site: "https://armaan.cc",
  integrations: [
    tailwind(),
    expressiveCode(),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [rawFonts([".ttf", ".woff"])],
  },
});

// vite plugin to import fonts
function rawFonts(ext: string[]) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  } satisfies Plugin;
}
