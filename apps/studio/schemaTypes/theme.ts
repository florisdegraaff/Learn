import { defineField, defineType } from "sanity";

export const theme = defineType({
  title: "Theme",
  name: "theme",
  type: "object",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: 'title',
        maxLength: 200,
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      title: "Questions",
      name: "questions",
      type: "array",
      of: [
        { type: "openQuestion" }
      ],
      validation: (rule) => rule.required()
    })
  ]
})