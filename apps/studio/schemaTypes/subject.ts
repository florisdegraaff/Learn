import { defineField, defineType } from "sanity";

export const subject = defineType({
  title: "Subject",
  name: "subject",
  type: "object",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string"
    })
  ]
})