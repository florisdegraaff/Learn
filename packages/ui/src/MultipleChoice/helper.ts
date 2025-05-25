import { MultipleChoiceQuestion } from "@repo/sanity-types";

export function getMultipleChoiceResult (correctAnswers: MultipleChoiceQuestion['answers'], userAnswers: string[]) {
  if (correctAnswers.length === userAnswers.length && correctAnswers.every(({_key}) => userAnswers.includes(_key)))
    return "correct"
  else return "incorrect"
}