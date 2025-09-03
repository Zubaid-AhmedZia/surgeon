import { Rule } from "sanity";

export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name", validation: (r: Rule) => r.required() },
    { name: "role", type: "string", title: "Role" },
    { name: "bio", type: "array", of: [{ type: "block" }], title: "Bio" },
    { name: "photo", type: "image", title: "Photo", options: { hotspot: true } },
  ],
};

