import { Rule } from "sanity";

export default {
  name: "procedure",
  title: "Procedure",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title", validation: (r: Rule) => r.required() },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title", maxLength: 96 } },
    { name: "summary", type: "text", title: "Summary" },
    { name: "animationUrl", type: "url", title: "Lottie/Rive URL" },
    { name: "content", type: "array", of: [{ type: "block" }], title: "Content" },
    {
      name: "timeline",
      title: "Timeline Steps",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "detail", type: "text", title: "Detail" },
      ] }],
    },
  ],
};

