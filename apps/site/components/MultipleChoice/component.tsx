"use client"

import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from "@repo/sanity-types";
import { useState } from "react";

type MultipleChoiceQuestionProps = {
  question: MultipleChoiceQuestionType
  nextQuestion: (result: "correct" | "incorrect") => void
}

export function MultipleChoiceQuestion (props: MultipleChoiceQuestionProps) {
  const { question, nextQuestion } = props

  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>()

  return <>
    <FormControl component={"form"} onSubmit={(event) => {
      event?.preventDefault()
      setIsSubmitted(true)
    }}>
      <FormLabel>
        <Typography variant="h4" component={'p'}>{question?.question}</Typography>
      </FormLabel>
      <RadioGroup
        name={question?.question}
        value={selectedAnswer}
        onChange={(e) => {
          setSelectedAnswer(e.target.value)
        }}
      >
        {question?.answers?.map((answer) => {
          return (
            <FormControlLabel
              key={answer._key}
              value={answer._key}
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    color: isSubmitted ? (answer.isCorrect
                      ? 'success.main'
                      : selectedAnswer === answer._key
                      ? 'error.main'
                      : 'text.disabled'
                    ) : 'inherit'
                  }}
                >{answer.answer}</Typography>
              }
              disabled={isSubmitted}
            />
          )
        })}
      </RadioGroup>
      {!isSubmitted
        ? <Button type="submit">Submit</Button>
        : <Button type="button" onClick={() => {
          setIsSubmitted(false)
          setSelectedAnswer('')
          const answerIsCorrect = question.answers?.find((answer) => answer.isCorrect)?._key === selectedAnswer
          nextQuestion(answerIsCorrect ? "correct" : "incorrect")
        }}>Next question</Button>}
    </FormControl>
  </>
}