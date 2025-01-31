import { Container } from "@mui/material"

export default async function CoursePage (pageProps: Readonly<{
  params: Promise<{
    courseSlug: string
    themeSlug: string
  }>,
}>) {
  const {courseSlug} = await pageProps.params

  return (
    <Container component={"main"}>
    </Container>
  )
}