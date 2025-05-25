"use client"

import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Typography
} from "@mui/material";
import { Section } from "@repo/sanity-types";
import { useCallback, useState } from "react";
import { ResultAlert } from "../Alert/component";
import { checkAnswerWithGPT } from "../lib/gpt";
import { getMultipleChoiceResult } from "../MultipleChoice/helper";
import { Question } from "../Questions/component";
import { useQuestionnaire } from "./helpers";

type QuizProps = {
  questions: Section["questions"];
};

export function Quiz({ questions }: QuizProps) {
  const { currentQuestion, nextQuestion } = useQuestionnaire(questions);
  const [status, setStatus] = useState<"answering" | "verifying" | "submitted">("answering");
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<"correct" | "incorrect" | undefined>(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      if (!currentQuestion) return;

      if (status !== "answering") {
        nextQuestion(result || "incorrect");
        setUserAnswers([]);
        setStatus("answering");
        // setResult(undefined);
        return;
      }

      const { _type } = currentQuestion;

      if (_type === "openQuestion") {
        const userAnswer = userAnswers[0] ?? "";
        setStatus("verifying")
        checkAnswerWithGPT(currentQuestion.question, currentQuestion.answer, userAnswer)
          .then(({ response }) => {
            setResult(response.result)
            setSnackbarOpen(true)
            setStatus("submitted");
          });
      }

      if (_type === "multipleChoiceQuestion") {
        const correctAnswers = currentQuestion.answers.filter((a) => a.isCorrect);
        const evaluation = getMultipleChoiceResult(correctAnswers, userAnswers);
        setResult(evaluation);
        setSnackbarOpen(true)
        setStatus("submitted");
      }
    },
    [status, result, currentQuestion, nextQuestion, userAnswers]
  );

  if (!currentQuestion) return null;

  

  return (
    <>
      <Card sx={{ borderRadius: "1rem", marginBlock: "2rem" }}>
        <CardContent sx={{ marginBlock: "1rem", marginInline: "1rem" }}>
          <FormControl component="form" onSubmit={onSubmit} sx={{ width: "100%" }}>
            <Typography variant="h4" component="p" marginBlockEnd="1rem">
              {currentQuestion.question}
            </Typography>
            <Question
              question={currentQuestion} 
              status={status} 
              userAnswers={userAnswers} 
              setUserAnswers={setUserAnswers} 
              result={result}
            />
            <QuizButton isSubmitted={status === "submitted"} disabled={userAnswers.length === 0} />
          </FormControl>
        </CardContent>
      </Card>

      <Backdrop open={status === "verifying"}>
        <CircularProgress />
      </Backdrop>

      <ResultAlert result={result} setResult={setResult} open={snackbarOpen} setOpen={setSnackbarOpen} />
    </>
  );
}

function QuizButton({ isSubmitted, disabled }: { isSubmitted: boolean; disabled: boolean }) {
  return (
    <Button variant="contained" type="submit" disabled={disabled} sx={{marginBlockStart: "1rem"}}>
      {isSubmitted ? "Next question" : "Submit"}
    </Button>
  );
}
