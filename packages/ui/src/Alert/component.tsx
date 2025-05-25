import { Alert, Snackbar } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

type Props = {
  result: "correct" | "incorrect" | undefined,
  setResult: Dispatch<SetStateAction<"correct" | "incorrect" | undefined>>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function ResultAlert (props: Props) {
  const {result, setResult, open, setOpen} = props

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={() => {
        setOpen(false)
        setResult(undefined)
      }}
      autoHideDuration={3000}
    >
      {result === "correct" ? (
        <Alert variant="filled" severity="success">
          You answered correctly!
        </Alert>
      ) : result === 'incorrect' ? (
        <Alert variant="filled" severity="error">
          Your answer was not correct
        </Alert>
      ) : (
        <Alert variant="filled" severity="warning">
          Something went wrong
        </Alert>
      )}
    </Snackbar>
  )
}