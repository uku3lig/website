import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import markdoc from "@astrojs/markdoc";
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
  integrations: [sitemap(), icon(), svelte(), markdoc()],
  fonts: [
    {
      name: "IBM Plex Sans",
      cssVariable: "--ibm-plex-sans",
      provider: fontProviders.fontsource(),
      weights: ["100 900"],
      subsets: ["latin"],
      styles: ["normal", "italic"],
    },
    {
      name: "Iosevka",
      cssVariable: "--iosevka",
      provider: fontProviders.fontsource(),
      subsets: ["latin"],
      styles: ["normal", "italic"],
    },
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
