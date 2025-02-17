import { defineField, defineType } from "sanity";

export const openQuestion = defineType({
  title: "Open question",
  name: "openQuestion",
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
      title: "Answer",
      name: "answer",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      title: "Answer is exact",
      name: "exact",
      type: "boolean",
    })
  ]
})