import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    description: z.string(),
  }),
});

export const collections = { blog };
