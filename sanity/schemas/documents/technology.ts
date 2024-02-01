import { defineField, defineType } from "sanity";

export default defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
