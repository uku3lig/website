import { z, defineCollection } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      tags: z.array(z.string()),
    }),
  }),
};
