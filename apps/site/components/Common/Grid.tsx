import { Box } from "@mui/material";

export function Grid (props: {children: React.ReactNode}) {
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(12, 1fr)"}
      columnGap={"1rem"}
    >{props.children}</Box>
  )
}