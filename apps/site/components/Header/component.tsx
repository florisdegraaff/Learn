import { Home } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";

export function Header () {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton>
          <Home />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}