import { defineField, defineType } from "sanity";

export default defineType({
  name: "employer",
  title: "Employer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "Full-time" },
          { title: "Part-time", value: "Part-time" },
          { title: "Contract", value: "Contract" },
          { title: "Freelance", value: "Freelance" },
          { title: "Internship", value: "Internship" },
          { title: "Volunteer", value: "Volunteer" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
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
