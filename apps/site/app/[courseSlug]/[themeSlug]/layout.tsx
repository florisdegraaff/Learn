import { QuizFooter } from "../../../components/layout/quizFooter/quizFooter";

export default async function CourseLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <QuizFooter />
    </>
  )
}