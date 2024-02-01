import type { SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import employer from "./schemas/documents/employer";

import project from "./schemas/documents/project";
import siteConfig from "./schemas/documents/siteConfig";
import technology from "./schemas/documents/technology";
import link from "./schemas/objects/link";

export const schemaTypes = [
  project,
  blockContent,
  technology,
  employer,
  link,
  siteConfig,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, blockContent, technology, employer, link, siteConfig],
};
