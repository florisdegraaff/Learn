import { Header } from "../../components/layout/header/header";
import { fetchCourses } from "../../lib/sanity/queries";

export default async function CourseLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const courses = await fetchCourses()
  
  return (
    <>
      <Header courses={courses}/>
      {children}
    </>
  )
}