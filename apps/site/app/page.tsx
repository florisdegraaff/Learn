import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import { fetchCourses } from "../lib/sanity/queries";

export default async function Home() {
  const courses = await fetchCourses()

  return (
    <main>
      <Container sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "1rem"
      }}>
        {courses.map((course) => {
          return (
            <Card
              key={course._id}
              variant="outlined"
              raised
              sx={{
                gridColumn: "span 3",
                borderRadius: "0.5rem"
              }}
            >
              <CardContent>
                <Typography>{course.title}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={`/${course.slug.current}`}>Go to</Button>
              </CardActions>
            </Card>
          )
        })}
      </Container>
    </main>
  );
}
