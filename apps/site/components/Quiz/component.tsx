"use client"

import { MultipleChoiceQuestion } from "@components/MultipleChoice/component";
import { Section } from "@repo/sanity-types";
import { useQuestionnaire } from "./helpers";

type QuizProps = {
  questions: Section['questions']
}

export function Quiz (props: QuizProps) {
  const { currentQuestion, nextQuestion } = useQuestionnaire(props.questions);
  
  return (<>
    {currentQuestion?._type === 'multipleChoiceQuestion'
      ? <MultipleChoiceQuestion
          key={currentQuestion?._key}
          question={currentQuestion}
          nextQuestion={nextQuestion}
        />
      : undefined
    }
  </>)
}