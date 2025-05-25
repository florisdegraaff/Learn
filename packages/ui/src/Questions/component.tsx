import { Section } from "@repo/sanity-types";
import { Dispatch, SetStateAction } from "react";
import { MultipleAnswers, SingleAnswer } from "../MultipleChoice/component";
import { OpenQuestion } from "../Open/component";

type Props = {
  question: Section["questions"][0]
  status: "answering" | "verifying" | "submitted"
  userAnswers: string[]
  setUserAnswers: Dispatch<SetStateAction<string[]>>
  result: undefined | "correct" | "incorrect"
}

export function Question (props: Props) {
  const {question, status, userAnswers, setUserAnswers, result} = props;
  if (question._type === "multipleChoiceQuestion") {
    const multipleCorrect = question.answers.filter((a) => a.isCorrect).length > 1;
    const MultipleChoice = multipleCorrect ? MultipleAnswers : SingleAnswer;
    return (
      <MultipleChoice
        answers={question.answers}
        isSubmitted={status === "submitted"}
        selectedAnswers={userAnswers}
        setSelectedAnswers={setUserAnswers}
      />
    );
  }

  if (question._type === "openQuestion") {
    return (
      <OpenQuestion
        correctAnswer={question.answer}
        userAnswer={userAnswers[0] || ""}
        setUserAnswer={(answer) => setUserAnswers([answer])}
        isSubmitted={status === "submitted"}
        result={result}
      />
    );
  }

  return null;
};