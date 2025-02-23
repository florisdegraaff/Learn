'use client'
import { Add, Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, List, ListItem, TextField, Typography } from "@mui/material";
import { MultiQuestion as MultiQuestionType } from "@repo/sanity-types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { checkAnswerWithGPT } from "../../../lib/gpt";
import { urlFor } from "../../../lib/sanity/urlFor";
import { useQuestion } from "../../quiz/question";

type MultiQuestionProps = Omit<MultiQuestionType, '_type'>

export function MultiQuestion (props: MultiQuestionProps) {
  const { question, answers, image, exact } = props
  const { phase, setPhase, result, setResult } = useQuestion()

  const [userAnswers, setUserAnswers] = useState<Array<string>>([''])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (phase === 'answered' && result === undefined && !isLoading) {
      if (exact) {
        setResult(
          userAnswers.map(answer => answer.toLowerCase()) === answers.map(answer => answer.toLowerCase())
            ? "correct"
            : "incorrect"
        )
      } else {
        setIsLoading(true)
        checkAnswerWithGPT(question, answers.join(' & '), [...userAnswers].join(' & '))
          .then(({response}) => {
            setResult(response.result)
            const feedback = response.feedback
            if (feedback) setFeedback(feedback)
            setIsLoading(false)
          }) 
      }
    }
  }, [exact, result, setResult, phase, userAnswers, question, isLoading, answers])

  useEffect(() => {
    if (phase === 'answering') {
      setUserAnswers([''])
    }
  }, [phase])

  return (
    <Box component={"form"} onSubmit={(event) => {
      event.preventDefault()
      setPhase('answered')
    }}>
      <Typography variant="h2">{question}</Typography>
      <List>
        {userAnswers.map((userAnswer, key) => {
          return (
            <ListItem key={`userAnswer-${key}`} sx={{
              columnGap: "1rem"
            }}>
              <TextField
                fullWidth
                onChange={(event) => {
                  const newUserAnswers = [...userAnswers]
                  newUserAnswers[key] = event.currentTarget.value
                  setUserAnswers(newUserAnswers)
                }}
                disabled={phase === 'answered'}
                value={userAnswer}
              />
              <IconButton
                onClick={() => {
                  if (userAnswers.length < 1) return
                  const newUserAnswers = [...userAnswers]
                  newUserAnswers.splice(key, 1)
                  setUserAnswers(newUserAnswers)
                }}
                disabled={userAnswers.length < 1 || phase === 'answered'}
              ><Delete /></IconButton>
            </ListItem>
          )
        })}
      </List>
      
      <Button
        startIcon={<Add/>}
        onClick={() => setUserAnswers((userAnswers) => [...userAnswers, ''])}
        disabled={phase === 'answered'}
      >Voeg toe</Button>

      <Box display={"flex"}>
        <Box flex={1}>
          {isLoading && (
            <Box><CircularProgress /></Box>
          )}
          {result && (
            <>
              <Typography>{result}</Typography>
              <Typography fontWeight={700}>Juiste antwoorden:</Typography>
              {answers.map((answer) => (
                <Typography key={answer.replace(' ', '-').toLowerCase()}>{answer}</Typography>
              ))}
              {feedback && (<>
                <Typography fontWeight={700}>Feedback van ChatGPT:</Typography>
                <Typography>{feedback}</Typography>
              </>)}
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