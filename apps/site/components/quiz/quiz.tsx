'use client'
import { Theme } from "@repo/sanity-types";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type QuizContextType = {
  currentQuestion?: Theme['questions'][0],
  nextQuestion?: () => void
}

const QuizContext = createContext<QuizContextType>({})

type QuizContextProviderProps = {
  children: React.ReactNode,
  theme: Theme
}

export function QuizContextProvider (props: QuizContextProviderProps) {
  const { children, theme } = props
  const router = useRouter()

  const [questions, setQuestions] = useState<Theme['questions']>(theme.questions)
  const currentQuestion = useMemo(() => questions[0], [questions])

  const nextQuestion = useCallback(() => {
    const newQuestions = [...questions]
    newQuestions.shift()

    if (newQuestions.length > 0)
      setQuestions(newQuestions)
    else router.push('../')
  }, [questions, router])

  return (
    <QuizContext.Provider value={{
      currentQuestion,
      nextQuestion
    }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz () {
  return useContext(QuizContext)
}