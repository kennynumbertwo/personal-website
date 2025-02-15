import { defineField, defineType, defineArrayMember } from "sanity";
import { isUniqueAcrossAllDocuments, slugify } from "@/utils";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isUniqueAcrossAllDocuments,
        slugify: slugify,
      },
      validation: (Rule) =>
        Rule.custom((slug) => {
          if (slug?.current && typeof slug.current === "string") {
            if (!/^[a-z0-9-]+$/.test(slug.current)) {
              return "Slug can only contain lowercase letters, numbers, and hyphens.";
            }
            return true;
          }
          return "Slug must be a string";
        }).required(),
    }),
    defineField({
      name: "employer",
      title: "Employer",
      type: "reference",
      to: [{ type: "employer" }],
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          {
            title: "Shopify Theme",
            value: "Shopify Theme",
          },
          {
            title: "Marketing Site",
            value: "Marketing Site",
          },
          {
            title: "Web App",
            value: "Web App",
          },
        ],
      },
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
    }),
    defineField({
      name: "contribution",
      title: "Contribution",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "hideFromWork",
      title: "Hide from Work",
      type: "boolean",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
