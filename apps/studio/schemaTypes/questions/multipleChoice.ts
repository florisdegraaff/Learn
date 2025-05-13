import { defineField, defineType } from "sanity";

export const multipleChoiceQuestion = defineType({
  title: "Multiple choice question",
  name: "multipleChoiceQuestion",
  type: "object",
  fields: [
    defineField({
      title: "Question",
      name: "question",
      type: "string"
    }),
    defineField({
      title: "Answers",
      name: "answers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              title: "Answer",
              name: "answer",
              type: "string"
            }),
            defineField({
              title: "Is correct",
              name: "isCorrect",
              type: "boolean"
            })
          ]
        }
      ]
    })
  ]
})