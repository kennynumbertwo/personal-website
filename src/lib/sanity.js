import { createClient } from "@sanity/client";

// Plain Sanity client for data fetching (the embedded @sanity/astro studio was
// removed; content is edited via the standalone hosted studio). Replaces the
// `sanity:client` virtual module that the integration used to provide.
export const sanityClient = createClient({
  projectId: "epj8euse",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
