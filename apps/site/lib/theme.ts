'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-geist-sans)',
    h1: { fontSize: "3.2rem" },
    h2: { fontSize: "2.8rem" },
    h3: { fontSize: "2.4rem" },
    h4: { fontSize: "2rem" },
  },
  palette: {
    primary: {
      light: "#d0e3f1",
      main: "#81b5d9",
      dark: "#2f6f9d",
      contrastText: "#ffffffde"
    },
    secondary: {
      main: "#ffbeef"
    },
    error: {
      main: "#e87461"
    },
    success: {
      main: "#68edc6",
      light: "#b6f6e3"
    },
    info: {
      main: "#fabc3c"
    },
  }
});

export default theme;