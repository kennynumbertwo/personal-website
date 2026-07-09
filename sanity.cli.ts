import { defineCliConfig } from "sanity/cli";
import path from "node:path";

// Standalone Sanity Studio CLI config (the embedded @sanity/astro studio was
// removed). Enables `sanity dev` / `sanity build` / `sanity deploy` from this repo.
export default defineCliConfig({
  api: {
    projectId: "epj8euse",
    dataset: "production",
  },
  // The schema imports `@/utils` (src/utils); alias it for the studio's Vite build.
  vite: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        "@": path.resolve(process.cwd(), "src"),
      },
    },
  }),
});
