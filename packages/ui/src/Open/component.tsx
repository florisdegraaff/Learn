"use client"

import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { OpenQuestion as OpenQuestionType } from "@repo/sanity-types";
import { ChangeEventHandler } from "react";

type OpenQuestionProps = {
  correctAnswer: OpenQuestionType['answer']
  userAnswer: string
  setUserAnswer: (answer: string) => void
  isSubmitted: boolean
  result: undefined | "correct" | "incorrect"
}

export function OpenQuestion (props: OpenQuestionProps) {
  const { correctAnswer, userAnswer, setUserAnswer, isSubmitted, result } = props

  return(
    <Box display="flex" columnGap={"1rem"}>
      {!isSubmitted || result === undefined
        ? RenderForm(userAnswer, (e) => setUserAnswer(e.currentTarget.value))
        : RenderResult(userAnswer, correctAnswer)}
    </Box>
  )
}

function RenderForm (currentAnswer: string, onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>) {
  return (<>
    <TextField
      onChange={onChange}
      value={currentAnswer}
      multiline
      minRows={3}
      sx={{
        flex: 1,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'primary.main',
          },
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
      color="primary"
      label="Your answer"
    />
  </>)
}

function RenderResult (userAnswer: string, correctAnswer: string) {
  return <>
    <Card variant="outlined" sx={{flex: 1,
          borderRadius: "0.5rem",
    border: "0.15rem solid var(--mui-palette-primary-main)",
    }}>
      <CardContent>
        <Typography variant="caption">Your answer</Typography>
        <Typography>{userAnswer}</Typography>
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{flex: 1,
          borderRadius: "0.5rem",
    border: "0.15rem solid var(--mui-palette-primary-main)",
    }}>
      <CardContent>
        <Typography variant="caption">Correct answer</Typography>
        <Typography>{correctAnswer}</Typography>
      </CardContent>
    </Card>
  </>
}