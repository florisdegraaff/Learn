import { fetchCourses } from "@lib/sanity/queries";
import { Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default async function Page () {
  const courses = await fetchCourses()
  
  return (
    <Container component={"main"}>
      <List>
        {courses.map((course) => (
          <ListItem key={course._id} disablePadding>
            <ListItemButton href={`/${course.slug.current}`}>
              <ListItemText primary={course.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}