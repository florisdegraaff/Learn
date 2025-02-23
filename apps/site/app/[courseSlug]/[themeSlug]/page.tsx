'use client'
import { Container } from "@mui/material"
import { MultiQuestion } from "../../../components/questions/multiQuestion/multiQuestion"
import { OpenQuestion } from "../../../components/questions/openQuestion/openQuestion"
import { useQuiz } from "../../../components/quiz/quiz"

export default function CoursePage () {
  const { currentQuestion } = useQuiz()
  return (
    <Container component={"main"}>
      {currentQuestion?._type === 'openQuestion' 
      ? <OpenQuestion {...currentQuestion} key={currentQuestion._key} />
      : currentQuestion?._type === 'multiQuestion'
      ? <MultiQuestion {...currentQuestion} key={currentQuestion._key} />
      : undefined}
    </Container>
  )
}