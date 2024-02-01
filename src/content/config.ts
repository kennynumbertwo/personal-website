import { defineCollection } from 'astro:content';
import { projectsSchema } from '../schemas';

const projects = defineCollection({
  type: 'content',
  schema: projectsSchema,
});

export const collections = {
  projects,
};
