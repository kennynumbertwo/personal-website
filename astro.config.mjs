import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpine from "@astrojs/alpinejs";
import react from "@astrojs/react";
import { sanityIntegration } from "@sanity/astro";
import { SITE } from "./src/config";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    tailwind(),
    react(),
    alpine({
      entrypoint: "/src/entrypoint",
    }),
    sanityIntegration({
      projectId: "epj8euse",
      dataset: "production",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      // Access the Studio on your.url/admin
      studioBasePath: "/admin",
    }),
  ],
  site: SITE.url,
  adapter: vercel(),
});
