import { defineField, defineType } from "sanity";

export const course = defineType({
  title: "Course",
  name: "course",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string"
    }),
    defineField({
      title: "slug",
      name: "Slug",
      type: "slug",
      options: {
        source: 'title',
        maxLength: 200,
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
      }
    }),
  ],
})