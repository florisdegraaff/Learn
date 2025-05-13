import { defineField, defineType } from "sanity";

export const section = defineType({
  title: "Section",
  name: "section",
  type: "object",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string"
    }),
    defineField({
      title: "Questions",
      name: "questions",
      type: "array",
      of: [
        { type: "multipleChoiceQuestion" }
      ],
      validation: (rule) => rule.required()
    })
  ]
})