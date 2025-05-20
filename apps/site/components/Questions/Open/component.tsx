"use client"

import { Grid } from "@components/Common/Grid";
import { checkAnswerWithGPT } from "@lib/gpt";
import { Alert, Backdrop, Button, Card, CardContent, CircularProgress, FormControl, FormLabel, Snackbar, TextField, Typography } from "@mui/material";
import { OpenQuestion as OpenQuestionType } from "@repo/sanity-types";
import { ChangeEventHandler, FormEventHandler, useCallback, useState } from "react";

type OpenQuestionProps = {
  question: OpenQuestionType
  nextQuestion: (result: "correct" | "incorrect") => void
}

export function OpenQuestion (props: OpenQuestionProps) {
  const { question, nextQuestion } = props

  const [currentAnswer, setCurrentAnswer] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [result, setResult] = useState<"correct" | "incorrect" | undefined>(undefined)

  const submitAnswer = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault()
    setIsSubmitted(true)
    checkAnswerWithGPT(question.question, question.answer, currentAnswer)
    .then(({response}) => {
      setResult(response.result)
    })
  }, [currentAnswer, question.answer, question.question])

  return <>
    <FormControl component={"form"} onSubmit={submitAnswer} sx={{width: "100%"}}>
      <Grid>
        <FormLabel sx={{gridColumn: "span 12"}}>
          <Typography variant="h4" component={'p'} textAlign={"center"} marginBlock={"1rem"}>{question?.question}</Typography>
        </FormLabel>
        {!isSubmitted || result === undefined 
          ? RenderForm(currentAnswer, (e) => setCurrentAnswer(e.currentTarget.value))
          : RenderResult(question.answer, currentAnswer, () => {
              setIsSubmitted(false)
              setCurrentAnswer('')
              nextQuestion(result || "incorrect")
            })}
      </Grid>
    </FormControl>
    <Backdrop open={isSubmitted && !result}>
      <CircularProgress />
    </Backdrop>
    
    <Snackbar open={isSubmitted && !!result} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      {result === 'correct'
        ? <Alert variant="outlined" severity="success" sx={{ bgcolor: 'background.paper' }}>You answered correctly!</Alert>
        : <Alert variant="outlined" severity="warning" sx={{ bgcolor: 'background.paper' }}>Your answer was not correct</Alert>
      }
    </Snackbar>
  </>
}

function RenderForm (currentAnswer: string, onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>) {
  return (<>
    <TextField
      onChange={onChange}
      value={currentAnswer}
      sx={{gridColumn: "4 / span 6"}}
    />
    <Button type="submit" sx={{gridColumn: "6 / span 2"}} disabled={!currentAnswer}>Submit</Button>
  </>)
}

function RenderResult (correctAnswer: string, currentAnswer: string, nextQuestion: () => void) {
  return <>
    <Card variant="outlined" sx={{gridColumn: "span 6"}}>
      <CardContent>
        <Typography variant="caption">Your answer</Typography>
        <Typography>{currentAnswer}</Typography>
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{gridColumn: "span 6"}}>
      <CardContent>
        <Typography variant="caption">Correct answer</Typography>
        <Typography>{correctAnswer}</Typography>
      </CardContent>
    </Card>
    <Button
      type="button"
      sx={{gridColumn: "6 / span 2"}}
      onClick={nextQuestion}
    >Next question</Button>
  </>
}