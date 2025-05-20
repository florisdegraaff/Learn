import { course } from "./course";
import { program } from "./program";
import { questions } from "./questions";
import { section } from "./section";

export const schemaTypes = [
  course, section, program, ...questions
]
