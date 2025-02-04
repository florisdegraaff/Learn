import { defineQuery } from "next-sanity";
import { client } from "../sanity-client";

const COURSES_QUERY = defineQuery(`*[_type == "course"]`)
export const fetchCourses = () => client.fetch(COURSES_QUERY)

const COURSE_BY_SLUG_QUERY = defineQuery(`*[_type == "course" && slug.current == $courseSlug][0]`);
export const fetchCourseBySlug = (courseSlug: string) => client.fetch(COURSE_BY_SLUG_QUERY, {
  courseSlug
})

const THEME_BY_SLUG_QUERY = defineQuery(`*[_type == "course" && slug.current == $courseSlug][0].themes[slug.current == $themeSlug][0]`);
export const fetchThemeBySlug = (courseSlug: string, themeSlug: string) => client.fetch(THEME_BY_SLUG_QUERY, {
  courseSlug, themeSlug
})