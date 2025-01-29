'use client'
import { Close, Menu } from "@mui/icons-material";
import { Drawer, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { Course } from "@repo/sanity-types";
import { useState } from "react";

type HeaderProps = {
  courses: Array<Course>
}

export function Header (props: HeaderProps) {
  const { courses } = props
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <header>
      <IconButton onClick={() => setIsDrawerOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List>
          <ListItem>
            <IconButton>
              <Close />
            </IconButton>
          </ListItem>
          {courses.map((course) => {
            if (course.slug?.current === undefined || course.title === undefined) return undefined
            return (
              <ListItemButton key={course._id} href={`/${course.slug.current}`}>
                <Typography>{course.title}</Typography>
              </ListItemButton>
            )
          })}
        </List>
      </Drawer>
    </header>
  )
}