import { defineField, defineType } from "sanity";

export const theme = defineType({
  title: "Theme",
  name: "theme",
  type: "object",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string"
    })
  ]
})