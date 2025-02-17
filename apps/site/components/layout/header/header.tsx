'use client'
import { Close, Menu } from "@mui/icons-material";
import { AppBar, Drawer, IconButton, List, ListItem, ListItemButton, Toolbar, Typography } from "@mui/material";
import { Course } from "@repo/sanity-types";
import { useState } from "react";

type HeaderProps = {
  courses: Array<Course>
}

export function Header (props: HeaderProps) {
  const { courses } = props
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => setIsDrawerOpen(true)}>
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List>
          <ListItem>
            <IconButton onClick={() => {
              setIsDrawerOpen(false)
            }}>
              <Close />
            </IconButton>
          </ListItem>
          {courses.map((course) => {
            return (
              <ListItemButton key={course._id} href={`/${course.slug.current}`}>
                <Typography>{course.title}</Typography>
              </ListItemButton>
            )
          })}
        </List>
      </Drawer>
    </>
  )
}