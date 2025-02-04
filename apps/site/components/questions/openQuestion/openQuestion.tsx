'use client'
import { Box, TextField, Typography } from "@mui/material";
import { OpenQuestion as OpenQuestionType } from "@repo/sanity-types";
import { useEffect, useState } from "react";
import { useQuestion } from "../../quiz/question";

type OpenQuestionProps = Omit<OpenQuestionType, '_type'>

export function OpenQuestion (props: OpenQuestionProps) {
  const { question, answer } = props
  const { status, setStatus, response, setResponse, reset } = useQuestion()

  const [userAnswer, setUserAnswer] = useState<string>('')

  useEffect(() => {
    if (status === 'answered') {
      setResponse(userAnswer.toLowerCase() === answer.toLowerCase() ? "correct" : "incorrect")
    }
  }, [answer, setResponse, status, userAnswer])

  useEffect(() => {
    if (status === 'answering') {
      setUserAnswer('')
    }
  }, [status])

  useEffect(() => {
    setUserAnswer('')
    reset()
  }, [question, answer, reset])

  return (
    <Box component={"form"} onSubmit={(event) => {
      event.preventDefault()
      setStatus('answered')
    }}>
      <Typography>{question}</Typography>
      <TextField value={userAnswer}
        onChange={(event) => setUserAnswer(event.currentTarget.value)}
        label="Jouw antwoord"
        variant="filled"
        disabled={status === 'answered'}
      />
      <Typography>{response}</Typography>
    </Box>
  )
}