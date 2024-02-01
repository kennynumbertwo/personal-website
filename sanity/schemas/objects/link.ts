import { defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description:
        "For any internal links, please ONLY use relative URLs. (e.g. /SLUG).",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "openInNewWindow",
      title: "Open In New Window",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle,
    }),
  },
});
