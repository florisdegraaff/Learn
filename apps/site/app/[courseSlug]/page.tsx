import { Container, List, ListItemButton, Typography } from "@mui/material"
import { fetchCourseBySlug } from "../../lib/sanity/queries"

export default async function CoursePage (pageProps: Readonly<{
  params: Promise<{
    courseSlug: string
  }>,
}>) {
  const {courseSlug} = await pageProps.params
  const course = await fetchCourseBySlug(courseSlug)

  return (
    <Container component={"main"}>
      <Typography variant="h1">{course?.title}</Typography>
      <Typography variant="h2">Thema&apos;s</Typography>
      {course?.themes?.map((theme) => {
        return (
          <List key={theme._key}>
            <ListItemButton href={`/${courseSlug}/${theme.slug.current}`}>
              <Typography>{theme.title}</Typography>
            </ListItemButton>
          </List>
        )
      })}
    </Container>
  )
}