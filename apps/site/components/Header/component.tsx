import { Home } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";

export function Header () {
  return (
    <AppBar position="sticky" sx={{
      borderRadius: "1rem",
      margin: "0.5rem",
      width: "calc(100% - 1rem)",
      backgroundColor: "primary.dark"
    }}>
      <Toolbar>
        <IconButton sx={{
          color: "primary.contrastText"
        }}>
          <Home />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}