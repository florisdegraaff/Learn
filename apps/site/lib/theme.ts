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
    mode: "dark"
  }
});

export default theme;