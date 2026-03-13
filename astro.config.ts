import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";
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
  // This project uses the Satoshi font, which is a proprietary font.
  // Please view its license at ./assets/satoshi/LICENSE.txt
  fonts: [
    {
      name: "Satoshi Variable",
      cssVariable: "--font-satoshi",
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: [
              "./assets/satoshi/Satoshi-Variable.woff2",
              "./assets/satoshi/Satoshi-Variable.woff",
              "./assets/satoshi/Satoshi-Variable.ttf",
            ],
            weight: "300 900",
          },
        ],
      },
    },
  ],
  integrations: [
    icon(),
    expressiveCode({
      // https://expressive-code.com/reference/style-overrides
      styleOverrides: {
        borderColor: "var(--color-shades-border)",
        codeBackground: "var(--color-surface-elevated-1)",
        borderRadius: "var(--radius-lg)", // same as Aside.astro
        frames: {
          frameBoxShadowCssValue: "", // remove box shadow from code snippets

          editorBackground: "var(--color-surface-elevated-1)",
          editorTabBarBackground: "var(--color-surface-elevated-2)",
          editorTabBarBorderBottomColor: "var(--color-shades-border)",
          editorActiveTabBackground: "var(--color-surface-elevated-1)",
          editorActiveTabIndicatorBottomColor: "var(--color-surface-elevated-1)",
          editorActiveTabBorderColor: "var(--color-shades-border)",

          terminalBackground: "var(--color-surface-elevated-1)",
          terminalTitlebarBackground: "var(--color-surface-elevated-2)",
          terminalTitlebarBorderBottomColor: "var(--color-shades-border)",

          inlineButtonBorder: "var(--color-shades-border)",
          inlineButtonBorderOpacity: "100%",
          inlineButtonForeground: "var(--color-subtitle)",
        },
      },
      themes: ["github-light", "github-dark"],
      useDarkModeMediaQuery: true,
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
    css: {
      transformer: "lightningcss",
    },
  },
});
