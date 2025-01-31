import { AppBar, Button, Toolbar } from "@mui/material";

export function QuizFooter () {
  return (
    <AppBar position="fixed" component="footer" sx={{
      bottom: 0,
      top: 'auto'
    }}>
      <Toolbar variant="dense">
        <Button>Volgende vraag</Button>
        <Button>Overslaan</Button>
      </Toolbar>
    </AppBar>
  )
}