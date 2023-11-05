import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    description: z.string(),
  }),
});

export const collections = { blog };
