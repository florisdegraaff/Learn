import { defineField, defineType } from "sanity";

export const program = defineType({
  title: "Program",
  name: "program",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      title: "Courses",
      name: "courses",
      type: "array", 
      of: [{ type: "reference", to: [{ type: 'course' }] }]
    })
  ],
})