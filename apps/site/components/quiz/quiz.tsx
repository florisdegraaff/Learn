'use client'
import { Box, LinearProgress } from "@mui/material";
import { Theme } from "@repo/sanity-types";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type QuizContextType = {
  currentQuestion?: Theme['questions'][0],
  nextQuestion?: (result: "correct" | "incorrect") => void,
  phase: "answering" | "answered",
  setPhase: (status: "answering" | "answered") => void,
  result: "correct" | "incorrect" | undefined,
  setResult: (response: "correct" | "incorrect") => void,
  currentAttempt: number,
}

const QuizContext = createContext<QuizContextType>({
  phase: "answering",
  setPhase: () => undefined,
  result: undefined,
  setResult: () => undefined,
  currentAttempt: 0,
})

type QuizContextProviderProps = {
  children: React.ReactNode,
  theme: Theme
}

export function QuizContextProvider (props: QuizContextProviderProps) {
  const { children, theme } = props
  const router = useRouter()

  const [questions, setQuestions] = useState<Theme['questions']>(theme.questions)
  const currentQuestion = useMemo(() => questions[0], [questions])
  const [currentAttempt, setCurrentAttempt] = useState<number>(1)

  const [phase, setPhase] = useState<"answering" | "answered">("answering")
  const [result, setResult] = useState<"correct" | "incorrect" | undefined>(undefined)

  useEffect(() => {
    setPhase("answering")
    setResult(undefined)
    setCurrentAttempt(1)
  }, [currentQuestion])

  useEffect(() => {
    setPhase("answering")
    setResult(undefined)
  }, [currentAttempt])
  
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const nextQuestion = useCallback(() => {
    if (result === 'incorrect') {
      setCurrentAttempt(currentAttempt => currentAttempt + 1)
    } else {
      const newQuestions = [...questions]
      newQuestions.shift()

      if (currentAttempt !== 1 && currentQuestion) newQuestions.splice(5, 0, currentQuestion)

      if (newQuestions.length > 0) setQuestions(newQuestions)
      else router.push('../')
    }
  }, [currentAttempt, currentQuestion, questions, result, router])

  return (
    <QuizContext.Provider value={{
      currentQuestion,
      nextQuestion,
      phase,
      setPhase,
      result,
      setResult,
      currentAttempt,
    }}>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <LinearProgress sx={{width: "100%"}} value={100 * (1 - questions.length / theme.questions.length)} variant="determinate" />
        {/* <Typography variant="caption">{theme.questions.length - questions.length} / {theme.questions.length}</Typography> */}
      </Box>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz () {
  return useContext(QuizContext)
}