import { defineConfig, fontProviders, sharpImageService } from "astro/config";

import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import { satteri } from "@astrojs/markdown-satteri";
import icon from "astro-icon";
import { linkHeadings } from "./src/utils/satteri-link-headings";

// https://astro.build/config
export default defineConfig({
  site: "https://uku3lig.net",
  integrations: [sitemap(), icon(), svelte()],
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
    processor: satteri({
      hastPlugins: [linkHeadings],
    }),
  },
  image: {
    service: sharpImageService({
      webp: { nearLossless: true },
    }),
  },
});
