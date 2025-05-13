import { Section } from "@repo/sanity-types";
import { useCallback, useMemo, useState } from "react";

export const useQuestionnaire = (rawQuestions: Section['questions']) => {
  const [questionQueue, setQuestionQueue] = useState(rawQuestions.map(question => {
    return {
      attemptsLeft: 3,
      question
    }
  }))

  const currentQuestion = useMemo(() => questionQueue[0]?.question, [questionQueue])

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
      newQueue.splice(3, 0, currentCopy)
      return newQueue;
    })
  }, [])

  return { currentQuestion, nextQuestion }
}