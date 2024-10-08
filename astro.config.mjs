import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

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
  integrations: [
    sitemap(),
    icon({
      svgoOptions: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeTitle: false,
              },
            },
          },
        ],
      },
    }),
  ],
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
