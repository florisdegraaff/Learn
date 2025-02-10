'use client'
import { Box, TextField, Typography } from "@mui/material";
import { OpenQuestion as OpenQuestionType } from "@repo/sanity-types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { urlFor } from "../../../lib/sanity/urlFor";
import { useQuestion } from "../../quiz/question";

type OpenQuestionProps = Omit<OpenQuestionType, '_type'>

export function OpenQuestion (props: OpenQuestionProps) {
  const { question, answer, image, exact } = props
  const { status, setStatus, response, setResponse, reset } = useQuestion()

  const [userAnswer, setUserAnswer] = useState<string>('')

  useEffect(() => {
    if (status === 'answered') {
      if (exact) {
        setResponse(userAnswer.toLowerCase() === answer.toLowerCase() ? "correct" : "incorrect")
      } else {
        // Let ChatGPT decide
      }
    }
  }, [answer, exact, setResponse, status, userAnswer])

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
      <Typography variant="h2">{question}</Typography>
      <Box display={"flex"}>
        <Box flex={1}>
          <TextField value={userAnswer}
            onChange={(event) => setUserAnswer(event.currentTarget.value)}
            label="Jouw antwoord"
            variant="filled"
            disabled={status === 'answered'}
          />
          {response && (
            <>
              <Typography>{response}</Typography>
              <Typography>Juiste antwoord: {answer}</Typography>
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