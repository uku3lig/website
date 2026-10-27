import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { getName } from "../utils/name";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection("posts");

  return rss({
    title: `${getName(site)}'s blog`,
    description: "i write things here sometimes",
    site: site || "",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      categories: post.data.tags,
      link: `/posts/${post.id}`,
    })),
  });
};
