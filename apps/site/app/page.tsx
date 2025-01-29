import { Course } from "@repo/sanity-types";
import styles from "./page.module.css";

const course: Course = {
  title: "Course",
  _id: "",
  _type: "course",
  _createdAt: "",
  _updatedAt: "",
  _rev: ""
}
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {course.title}
      </main>
    </div>
  );
}
