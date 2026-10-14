import { defineHastPlugin } from "satteri";

export const linkHeadings = defineHastPlugin({
  name: "link-headings",
  element: {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    visit(node, ctx) {
      let id = node.properties.id;
      if (!id) {
        id = ctx
          .textContent(node)
          .toLowerCase()
          .replaceAll(/\s/g, "-")
          .replaceAll(/[^-\w]/g, "");

        ctx.setProperty(node, "id", id);
      }

      ctx.replaceNode(node, {
        ...node,
        children: [
          {
            type: "element",
            tagName: "a",
            properties: { className: ["heading-link"], href: `#${id}` },
            children: node.children,
          },
        ],
      });
    },
  },
});
