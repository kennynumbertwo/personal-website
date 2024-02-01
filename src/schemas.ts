import { z } from "astro:content";

const seoSchema = z.object({
  title: z.string().min(5).max(120).optional(),
  description: z.string().min(15).max(160).optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  pageType: z.enum(["website", "article"]).default("website"),
});

export const projectsSchema = z.object({
  title: z.string(),
  year: z.string(),
  seo: seoSchema.optional(),
});
