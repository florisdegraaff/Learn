import { fetchCourseBySlug } from "@lib/sanity/queries"
import { Container } from "@mui/material"
import { Section } from "@repo/sanity-types"
import { Quiz } from "@repo/ui/Quiz/component"

export default async function QuizPage (pageProps: Readonly<{
  params: Promise<{
    courseSlug: string
  }>,
}>) {
  const { courseSlug } = await pageProps.params
  const course = await fetchCourseBySlug(courseSlug)

  const questions = course?.sections?.reduce<Section['questions']>((prev, curr) => {
    return [...prev, ...curr.questions]
  }, []) || []

  return (
    <Container>
      {questions !== undefined
        ? <Quiz questions={questions} />
        : undefined
      }
    </Container>
  )
}