import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  nodes: {
    image: {
      ...nodes.image,
      render: component("./src/components/MDocImage.astro"),
    },
  },
  extends: [
    shiki({
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    }),
  ],
});
