import { defineQuery } from "next-sanity";
import { client } from "../sanity-client";

const COURSES_QUERY = defineQuery(`*[_type == "course"]`)
export const fetchCourses = () => client.fetch(COURSES_QUERY)

const COURSE_BY_SLUG_QUERY = defineQuery(`*[_type == "course" && slug.current == $courseSlug][0]`);
export const fetchCourseBySlug = (courseSlug: string) => client.fetch(COURSE_BY_SLUG_QUERY, {
  courseSlug
})