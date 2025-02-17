'use client'
import { Container } from "@mui/material"
import { OpenQuestion } from "../../../components/questions/openQuestion/openQuestion"
import { useQuiz } from "../../../components/quiz/quiz"

export default function CoursePage () {
  const { currentQuestion } = useQuiz()
  return (
    <Container component={"main"}>
      {currentQuestion?._type === 'openQuestion' 
      ? <OpenQuestion {...currentQuestion} key={currentQuestion._key} />
      : undefined}
    </Container>
  )
}