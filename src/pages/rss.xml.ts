import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection("posts");

  return rss({
    title: "uku's blog",
    description: "i can't think of a good description :(",
    site: site || "",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      categories: post.data.tags,
      link: `/posts/${post.slug}`,
    })),
  });
};
