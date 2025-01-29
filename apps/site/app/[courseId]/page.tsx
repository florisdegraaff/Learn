export default async function CoursePage (pageProps: Readonly<{
  params: Promise<{
    courseId: string
  }>
}>) {
  const params = await pageProps.params
  return (
    <main>
      {params.courseId}
    </main>
  )
}