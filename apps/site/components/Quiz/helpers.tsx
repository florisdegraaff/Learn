import { MultipleChoiceQuestion, OpenQuestion, Section } from "@repo/sanity-types";
import { useCallback, useMemo, useState } from "react";

export const useQuestionnaire = (rawQuestions: Section['questions']) => {
  const [questionQueue, setQuestionQueue] = useState(rawQuestions.map(question => {
    return {
      attemptsLeft: 3,
      question
    }
  }))

  const currentQuestion = useMemo(() => {
    const currentQuestion = {...questionQueue[0]}
    if (currentQuestion.question?._type === 'multipleChoiceQuestion' && currentQuestion.attemptsLeft === 1) {
      return {
        _key: currentQuestion.question._key,
        ...MultipleChoiceToOpen(currentQuestion.question)
      }
    }
    return currentQuestion.question
  } , [questionQueue])

  const nextQuestion = useCallback((result: "correct" | "incorrect") => {
    setQuestionQueue((currentQuestionQueue) => {
      const newQueue = [...currentQuestionQueue]
      const currentQuestion = newQueue.shift()
      
      if (!currentQuestion) return newQueue

      const currentCopy = {...currentQuestion}
      if (result === 'correct') {
        currentCopy.attemptsLeft -= 1
        if (currentCopy.attemptsLeft === 0) return newQueue
      } else {
        currentCopy.attemptsLeft = 3
      }
      newQueue.splice(4, 0, currentCopy)
      return newQueue;
    })
  }, [])

  return { currentQuestion, nextQuestion }
}

function MultipleChoiceToOpen (multipleChoice: MultipleChoiceQuestion): OpenQuestion {
  return {
    _type: "openQuestion",
    question: multipleChoice.question,
    answer: multipleChoice.answers.find(question => question.isCorrect)?.answer || ""
  }
}