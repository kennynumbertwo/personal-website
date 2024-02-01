import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schema";

export default defineConfig({
  name: "project-name",
  title: "Project Name",
  projectId: "epj8euse",
  dataset: "production",
  plugins: [structureTool()],
  schema,
});
