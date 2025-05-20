"use client"

import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from "@repo/sanity-types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type MultipleChoiceQuestionProps = {
  question: MultipleChoiceQuestionType
  nextQuestion: (result: "correct" | "incorrect") => void
}

export function MultipleChoiceQuestion (props: MultipleChoiceQuestionProps) {
  const { question, nextQuestion } = props
  const [answers, setShuffled] = useState<MultipleChoiceQuestionType['answers']>([])

  useEffect(() => {
    const shuffled = [...question.answers]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    setShuffled(shuffled)
  }, [question.answers])

  const [selectedAnswers, setSelectedAnswers] = useState<Array<string>>([])
  const [isSubmitted, setIsSubmitted] = useState<boolean>()

  return <>
    <FormControl component={"form"} onSubmit={(event) => {
      event?.preventDefault()
      setIsSubmitted(true)
    }}>
      <FormLabel>
        <Typography variant="h4" component={'p'}>{question?.question}</Typography>
      </FormLabel>
      {answers.filter(answer => answer.isCorrect).length > 1
        ? <MultipleAnswers question={question.question} answers={answers} isSubmitted={isSubmitted} selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers} />
        : <SingleAnswer question={question.question} answers={answers} isSubmitted={isSubmitted} selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers} />
      }
      {!isSubmitted
        ? <Button type="submit" disabled={!selectedAnswers}>Submit</Button>
        : <Button type="button" onClick={() => {
          const answerIsCorrect = answers.reduce((prev, curr) => {
            if (prev === false) return false
            return  curr.isCorrect 
              ? selectedAnswers.includes(curr._key)
              : !selectedAnswers.includes(curr._key)
          }, true)
          nextQuestion(answerIsCorrect ? "correct" : "incorrect")
        }}>Next question</Button>}
    </FormControl>
  </>
}

function SingleAnswer (props: Omit<MultipleChoiceQuestionType, '_type'> &
  ({
    isSubmitted: boolean | undefined,
    selectedAnswers: Array<string>,
    setSelectedAnswers: Dispatch<SetStateAction<string[]>>
  })
) {
  const { question, answers, isSubmitted, selectedAnswers, setSelectedAnswers } = props
  return (
    <RadioGroup
      name={question}
      value={selectedAnswers}
      onChange={(e) => {
        setSelectedAnswers([e.target.value])
      }}
    >
      {answers.map((answer) => {
        return (
          <FormControlLabel
            key={answer._key}
            value={answer._key}
            control={<Radio />}
            label={<Label answer={answer} isSubmitted={isSubmitted} selectedAnswers={selectedAnswers} />}
            disabled={isSubmitted}
          />
        )
      })}
    </RadioGroup>
  )
}

function MultipleAnswers (props: Omit<MultipleChoiceQuestionType, '_type'> &
  ({
    isSubmitted: boolean | undefined,
    selectedAnswers: Array<string>,
    setSelectedAnswers: Dispatch<SetStateAction<string[]>>
  })
) {
  const { answers, isSubmitted, selectedAnswers, setSelectedAnswers } = props
  return (
    <FormGroup>
      {answers.map((answer) => {
        return (
          <FormControlLabel
            key={answer._key}
            control={<Checkbox
              checked={selectedAnswers.includes(answer._key)}
              disabled={isSubmitted}
              onChange={() => {
                setSelectedAnswers((selectedAnswers) => {
                  if (selectedAnswers.includes(answer._key))
                    return selectedAnswers.filter(selectedAnswer => selectedAnswer !== answer._key)
                  return [...selectedAnswers, answer._key]
                })
              }}
            />}
            label={<Label answer={answer} isSubmitted={isSubmitted} selectedAnswers={selectedAnswers} />}
          />
        )
      })}
    </FormGroup>
  )
}

function Label (props: {
  isSubmitted: boolean | undefined,
  selectedAnswers: Array<string>,
  answer: MultipleChoiceQuestionType['answers'][0]
}) {
  const { answer, isSubmitted, selectedAnswers } = props
  return (
    <Typography
      sx={{
        color: isSubmitted ? (answer.isCorrect
          ? 'success.main'
          : selectedAnswers.includes(answer._key)
          ? 'error.main'
          : 'text.disabled'
        ) : 'inherit'
      }}
    >{answer.answer}</Typography>
  )
}