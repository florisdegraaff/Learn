import { defineField, defineType } from "sanity";

export const course = defineType({
  title: "Course",
  name: "course",
  type: "document",
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
      title: "Sections",
      name: "sections",
      type: "array", 
      of: [{ type: "section" }]
    })
  ],
})