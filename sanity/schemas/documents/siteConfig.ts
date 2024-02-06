import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteConfig",
  type: "document",
  title: "Site Settings",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "about",
      title: "About",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "selectWork",
      title: "Select Work",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
