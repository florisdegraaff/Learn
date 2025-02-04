'use client'
import { createContext, useCallback, useContext, useState } from "react";

type QuestionContextType = {
  status: "answering" | "answered",
  setStatus: (status: "answering" | "answered") => void,
  response: "correct" | "incorrect" | undefined,
  setResponse: (response: "correct" | "incorrect") => void,
  reset: () => void
}

const QuestionContext = createContext<QuestionContextType>({
  status: "answering",
  setStatus: () => undefined,
  response: undefined,
  setResponse: () => undefined,
  reset: () => undefined
})

type QuestionContextProviderProps = {
  children: React.ReactNode
}

export function QuestionContextProvider (props: QuestionContextProviderProps) {
  const { children } = props
  const [status, setStatus] = useState<"answering" | "answered">("answering")
  const [response, setResponse] = useState<"correct" | "incorrect" | undefined>(undefined)

  const reset = useCallback(() => {
    setStatus("answering")
    setResponse(undefined)
  }, [])

  return (
    <QuestionContext.Provider value={{
      status,
      setStatus,
      response,
      setResponse,
      reset
    }}>
      {children}
    </QuestionContext.Provider>
  )
}

export function useQuestion () {
  return useContext(QuestionContext)
}