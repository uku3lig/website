import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  site: "https://uku3lig.net",
  vite: {
    server: {
      watch: {
        // direnv somehow makes vite exponentially slower with bun
        ignored: ["**/.direnv/**"],
      },
    },
  },
  integrations: [sitemap(), icon(), svelte()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            class: "heading-link",
          },
        },
      ],
    ],
  },
});
