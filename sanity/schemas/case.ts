import { Rule } from "sanity";

export default {
  name: "case",
  title: "Case",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title", validation: (r: Rule) => r.required() },
    {
      name: "category",
      type: "string",
      title: "Category",
      options: { list: [
        { title: "Hand", value: "hand" },
        { title: "Burn", value: "burn" },
        { title: "Nerve", value: "nerve" },
        { title: "Aesthetic", value: "aesthetic" },
      ]},
      validation: (r: Rule) => r.required(),
    },
    { name: "cover", type: "image", title: "Cover Image", options: { hotspot: true } },
    { name: "blurb", type: "text", title: "Blurb" },
    { name: "consentDocId", type: "string", title: "Consent Doc ID" },
    { name: "before", type: "image", title: "Before" },
    { name: "after", type: "image", title: "After" },
  ],
};

