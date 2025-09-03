export default {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    { name: "question", type: "string", title: "Question" },
    { name: "answer", type: "array", of: [{ type: "block" }], title: "Answer" },
    { name: "category", type: "string", title: "Category" },
  ],
};

