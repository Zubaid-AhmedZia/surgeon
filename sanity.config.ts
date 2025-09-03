import { defineConfig } from "sanity";
import { structureTool } from "@sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "dr-sobia",
  title: "Dr Sobia CMS",
  projectId: process.env.SANITY_PROJECT_ID || "",
  dataset: process.env.SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});

