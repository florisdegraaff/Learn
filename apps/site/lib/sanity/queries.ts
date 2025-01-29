import "@repo/sanity-types";
import { defineQuery } from "next-sanity";
import { client } from "../sanity-client";

const COURSES_QUERY = defineQuery(`*[_type == "course"]`)
export const fetchCourses = () => client.fetch(COURSES_QUERY)
