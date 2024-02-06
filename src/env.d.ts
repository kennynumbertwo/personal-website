/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
interface Window {
  Alpine: import("alpinejs").Alpine;
}

declare module "sanity:client" {
  export const sanityClient: import("@sanity/client").SanityClient;
}

declare module "sanity:studio" {
  export const studioConfig: import("sanity").Config;
}
