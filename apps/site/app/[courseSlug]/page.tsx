import { fetchCourseBySlug } from "@lib/sanity/queries";
import { AllInclusive, ArrowForward } from "@mui/icons-material";
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

export default async function CoursePage (pageProps: Readonly<{
  params: Promise<{
    courseSlug: string
  }>,
}>) {
  const {courseSlug} = await pageProps.params
  const course = await fetchCourseBySlug(courseSlug)

  return (
    <Container>
      <Typography variant="h1">{course?.title}</Typography>
      <List>
        <ListItem disablePadding secondaryAction={<ListItemIcon><ArrowForward /></ListItemIcon>}>
          <ListItemButton href={`/${course?.slug.current}/quiz`}>
            <ListItemIcon><AllInclusive /></ListItemIcon>
            <ListItemText>Alles</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  )
}