import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import { sanityIntegration } from "@sanity/astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    tailwind(),
    react(),
    sanityIntegration({
      projectId: "epj8euse",
      dataset: "production",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      // Access the Studio on your.url/admin
      studioBasePath: "/admin",
    }),
  ],
});
