'use client'
import { Box, LinearProgress } from "@mui/material";
import { Theme } from "@repo/sanity-types";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import useEvent from "../../lib/events";

type QuizContextType = {
  currentQuestion?: Theme['questions'][0],
  nextQuestion?: (result: "correct" | "incorrect") => void,
  phase: "answering" | "answered",
  setPhase: (status: "answering" | "answered") => void,
  result: "correct" | "incorrect" | undefined,
  setResult: (response: "correct" | "incorrect") => void,
  currentAttempt: number,
  addReloadQuestionEventListener: (func: () => void) => void,
  removeReloadQuestionEventListener: (func: () => void) => void
}

const QuizContext = createContext<QuizContextType>({
  phase: "answering",
  setPhase: () => undefined,
  result: undefined,
  setResult: () => undefined,
  currentAttempt: 0,
  addReloadQuestionEventListener: () => undefined,
  removeReloadQuestionEventListener: () => undefined
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

  const reloadQuestionEvent = useEvent("onReloadQuestion")
  
  useEffect(() => {
    function reloadQuestion () {
      setPhase("answering")
      setResult(undefined)
      setCurrentAttempt(1)
    }

    reloadQuestionEvent.addEventListener(reloadQuestion)
    return () => reloadQuestionEvent.removeEventListener(reloadQuestion)
  }, [currentQuestion, reloadQuestionEvent])
  
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const nextQuestion = useCallback((result: "correct" | "incorrect") => {
    const newQuestions = [...questions]
    
    if (result === 'correct')
      newQuestions.shift()

    if (result === 'incorrect' && currentQuestion && currentAttempt === 1) {
      newQuestions.splice(5, 0, currentQuestion)
      setCurrentAttempt(currentAttempt => currentAttempt + 1)
    }

    if (newQuestions.length > 0) {
      setQuestions(newQuestions)
      reloadQuestionEvent.triggerEvent()
    } else router.push('../')
  }, [currentAttempt, currentQuestion, questions, reloadQuestionEvent, router])

  return (
    <QuizContext.Provider value={{
      currentQuestion,
      nextQuestion,
      phase,
      setPhase,
      result,
      setResult,
      currentAttempt,
      addReloadQuestionEventListener: reloadQuestionEvent.addEventListener,
      removeReloadQuestionEventListener: reloadQuestionEvent.removeEventListener
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