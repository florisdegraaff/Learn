'use client'
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { OpenQuestion as OpenQuestionType } from "@repo/sanity-types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { urlFor } from "../../../lib/sanity/urlFor";
import { useQuestion } from "../../quiz/question";

type OpenQuestionProps = Omit<OpenQuestionType, '_type'>

export function OpenQuestion (props: OpenQuestionProps) {
  const { question, answer, image, exact } = props
  const { phase, setPhase, result, setResult } = useQuestion()

  const [userAnswer, setUserAnswer] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (phase === 'answered' && result === undefined && !isLoading) {
      if (exact) {
        setResult(userAnswer.toLowerCase() === answer.toLowerCase() ? "correct" : "incorrect")
      } else {
        setIsLoading(true)
        fetch('/api/gpt', {
          method: 'post',
          body: JSON.stringify({
            question,
            answer,
            userAnswer
          })
        })
        .then(response => response.json())
        .then(({response}) => {
          setResult(response.result)
          const feedback = response.feedback
          if (feedback) setFeedback(feedback)
          setIsLoading(false)
        }) 
      }
    }
  }, [answer, exact, result, setResult, phase, userAnswer, question, isLoading])

  useEffect(() => {
    if (phase === 'answering') {
      setUserAnswer('')
    }
  }, [phase])

  return (
    <Box component={"form"} onSubmit={(event) => {
      event.preventDefault()
      setPhase('answered')
    }}>
      <Typography variant="h2">{question}</Typography>
      <Box display={"flex"}>
        <Box flex={1}>
          <TextField value={userAnswer}
            onChange={(event) => setUserAnswer(event.currentTarget.value)}
            label="Jouw antwoord"
            variant="filled"
            disabled={phase === 'answered'}
          />
          {isLoading && (
            <Box><CircularProgress /></Box>
          )}
          {result && (
            <>
              <Typography>{result}</Typography>
              <Typography>Juiste antwoord: {answer}</Typography>
              {feedback && (
                <Typography>Feedback van ChatGPT: {feedback}</Typography>
              )}
            </>
          )}
        </Box>
        <Box position={"relative"} width={"100%"} height={"50vh"} flex={1}>
          {image && (
            <Image src={urlFor(image).url()} alt={""} fill objectFit={"contain"} />
          )}
        </Box>
      </Box>
    </Box>
  )
}