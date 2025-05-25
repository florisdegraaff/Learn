"use client"

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from "@repo/sanity-types"
import { Dispatch, SetStateAction } from "react"

type Props = {
  isSubmitted: boolean | undefined
  selectedAnswers: string[]
  setSelectedAnswers: Dispatch<SetStateAction<string[]>>
  answers: MultipleChoiceQuestionType["answers"]
}

function getAnswerStyles(
  isSubmitted: boolean | undefined,
  isSelected: boolean,
  isCorrect: boolean
) {
  return {
    border: "0.15rem solid var(--mui-palette-primary-main)",
    borderInlineStartWidth: isSelected ? "0.5rem" : undefined,
    borderRadius: "0.5rem",
    padding: "0.5rem",
    paddingInlineStart: isSelected ? "0.15rem" : undefined,
    width: "100%",
    margin: 0,
    borderColor: isSubmitted
      ? isSelected
        ? isCorrect
          ? "success.dark"
          : "error.dark"
        : isCorrect
          ? "success.dark"
          : undefined
      : undefined,
    borderStyle: isSubmitted && !isSelected && isCorrect ? "dashed" : undefined,
    backgroundColor: isSubmitted
      ? isSelected
        ? isCorrect
          ? "success.main"
          : "error.light"
        : isCorrect
          ? "success.light"
          : undefined
      : undefined,
  }
}

export function SingleAnswer({
  isSubmitted,
  selectedAnswers,
  setSelectedAnswers,
  answers,
}: Props) {
  return (
    <RadioGroup
      value={selectedAnswers[0] ?? ""}
      onChange={(e) => setSelectedAnswers([e.target.value])}
      sx={{ gap: "1rem", width: "100%" }}
    >
      {answers.map(({ _key, isCorrect = false, answer }) => {
        const isSelected = selectedAnswers.includes(_key)
        return (
          <FormControlLabel
            key={_key}
            value={_key}
            control={<Radio disabled={isSubmitted} />}
            label={<Typography color="textPrimary">{answer}</Typography>}
            sx={getAnswerStyles(isSubmitted, isSelected, isCorrect)}
          />
        )
      })}
    </RadioGroup>
  )
}

export function MultipleAnswers({
  isSubmitted,
  selectedAnswers,
  setSelectedAnswers,
  answers,
}: Props) {
  return (
    <FormGroup sx={{ gap: "1rem", width: "100%" }}>
      {answers.map(({ _key, isCorrect = false, answer }) => {
        const isSelected = selectedAnswers.includes(_key)
        return (
          <FormControlLabel
            key={_key}
            control={
              <Checkbox
                checked={isSelected}
                disabled={isSubmitted}
                onChange={() =>
                  setSelectedAnswers((prev) =>
                    prev.includes(_key)
                      ? prev.filter((id) => id !== _key)
                      : [...prev, _key]
                  )
                }
              />
            }
            label={<Typography color="textPrimary">{answer}</Typography>}
            sx={getAnswerStyles(isSubmitted, isSelected, isCorrect)}
          />
        )
      })}
    </FormGroup>
  )
}
