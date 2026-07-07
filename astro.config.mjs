import { defineConfig } from "astro/config";
import alpine from "@astrojs/alpinejs";
import { SITE } from "./src/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
// Tailwind 4 is wired via PostCSS (postcss.config.mjs); the @tailwindcss/vite
// plugin is incompatible with the Vite build Astro bundles.
export default defineConfig({
  integrations: [
    alpine({
      entrypoint: "/src/entrypoint",
    }),
  ],
  image: {
    // Sanity CDN is the only remote image source (see src/lib/sanity.js).
    domains: ["cdn.sanity.io"],
  },
  site: SITE.url,
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
