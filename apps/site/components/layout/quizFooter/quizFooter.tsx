'use client'
import { AppBar, Button, Toolbar } from "@mui/material";
import { useQuiz } from "../../quiz/quiz";

export function QuizFooter () {
  const { nextQuestion } = useQuiz()
  const { phase, setPhase, result } = useQuiz()
  return (
    <AppBar position="fixed" component="footer" sx={{
      bottom: 0,
      top: 'auto'
    }}>
      <Toolbar variant="dense">
        {phase === 'answering' ? (
          <Button onClick={() => {
            setPhase('answered')
          }}>Bevestig</Button>
        ) : result === 'correct' ? (
          <Button onClick={() => {
            if (nextQuestion) nextQuestion(result || 'correct')
          }}>Volgende vraag</Button>
        ) : (
          <Button onClick={() => {
            if (nextQuestion) nextQuestion(result || 'incorrect')
          }}>Probeer opnieuw</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}