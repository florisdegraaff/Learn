import { defineField, defineType } from "sanity";

export const multiQuestion = defineType({
  title: "Multiple answers question",
  name: "multiQuestion",
  type: "object",
  fields: [
    defineField({
      title: "Question",
      name: "question",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
    }),
    defineField({
      title: "Answers",
      name: "answers",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required()
    }),
    defineField({
      title: "Answer is exact",
      name: "exact",
      type: "boolean",
    })
  ]
})