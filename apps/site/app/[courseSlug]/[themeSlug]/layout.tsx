import { Typography } from "@mui/material";
import { QuizFooter } from "../../../components/layout/quizFooter/quizFooter";
import { QuestionContextProvider } from "../../../components/quiz/question";
import { QuizContextProvider } from "../../../components/quiz/quiz";
import { fetchThemeBySlug } from "../../../lib/sanity/queries";

export default async function CourseLayout ({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    courseSlug: string
    themeSlug: string
  }>
}>) {
  const {courseSlug, themeSlug} = await params
  const theme = await fetchThemeBySlug(courseSlug, themeSlug)

  if (!theme)
    return <Typography variant="h2">Theme could not be found</Typography>

  return (
    <QuizContextProvider theme={theme}>
      <QuestionContextProvider>
        {children}
        <QuizFooter />
      </QuestionContextProvider>
    </QuizContextProvider>
  )
}