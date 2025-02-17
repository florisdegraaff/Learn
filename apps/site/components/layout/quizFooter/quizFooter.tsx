'use client'
import { AppBar, Button, Toolbar } from "@mui/material";
import { useQuestion } from "../../quiz/question";
import { useQuiz } from "../../quiz/quiz";

export function QuizFooter () {
  const { nextQuestion } = useQuiz()
  const { phase: status, setPhase: setStatus } = useQuestion()
  return (
    <AppBar position="fixed" component="footer" sx={{
      bottom: 0,
      top: 'auto'
    }}>
      <Toolbar variant="dense">
        {status === 'answering' ? (
          <Button onClick={() => {
            setStatus('answered')
          }}>Bevestig</Button>
        ) : (
          <Button onClick={() => {
            if (nextQuestion) nextQuestion()
          }}>Volgende vraag</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}