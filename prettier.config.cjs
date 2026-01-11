/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 100,
  plugins: [
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-astro"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  tailwindStylesheet: "./src/styles/globals.css",
  importOrder: [
    // astro
    "^astro($|:|/)",
    "^@astrojs/",
    "",

    // nodejs, third party modules
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "",

    // .astro files
    "^.+[.]astro$",
    "",

    // $/ and relative imports (script files only)
    "^\\$/.+[.](ts|tsx|js|jsx)$",
    "^\\$/[^.]+$",
    "^\\$/.+/[^.]+$",
    "^[.]{1,2}/.+[.](ts|tsx|js|jsx)$",
    "^[.]{1,2}/[^.]+$",
    "^[.]{1,2}/.+/[^.]+$",
    "",

    // images, videos, fonts, icons, other assets
    // (excludes css)
    "^.+[.](?!module[.]css$)(?!css$|scss$|sass$|less$|styl$)[^/]+$",
    "",
    "",

    // css
    "^.+[.]module[.]css$",
    "^.+[.](css|scss|sass|less|styl)$",
    "",
  ],
};
