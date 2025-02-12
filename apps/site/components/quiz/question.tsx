'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useQuiz } from "./quiz";

type QuestionContextType = {
  phase: "answering" | "answered",
  setPhase: (status: "answering" | "answered") => void,
  result: "correct" | "incorrect" | undefined,
  setResult: (response: "correct" | "incorrect") => void,
}

const QuestionContext = createContext<QuestionContextType>({
  phase: "answering",
  setPhase: () => undefined,
  result: undefined,
  setResult: () => undefined,
})

type QuestionContextProviderProps = {
  children: React.ReactNode
}

export function QuestionContextProvider (props: QuestionContextProviderProps) {
  const { children } = props
  const [phase, setPhase] = useState<"answering" | "answered">("answering")
  const [result, setResult] = useState<"correct" | "incorrect" | undefined>(undefined)
  const {currentQuestion} = useQuiz()

  useEffect(() => {
    setPhase("answering")
    setResult(undefined)
  }, [currentQuestion])

  return (
    <QuestionContext.Provider value={{
      phase,
      setPhase,
      result,
      setResult
    }}>
      {children}
    </QuestionContext.Provider>
  )
}

export function useQuestion () {
  return useContext(QuestionContext)
}