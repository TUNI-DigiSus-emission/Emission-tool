"use client";

import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material"
import { ReactNode } from "react";

export default function ThemeProvider({
  children
}: {
  children: ReactNode | ReactNode[];
}) {
  // Example color palette colors
  // #606c38
  // #283618
  // #fefae0
  // #dda15e
  // #bc6c25

  const theme = createTheme({
    palette: {
      background: {
        default: "#fefae0"
      },
      primary: {
        main: "#606c38"
      },
      secondary: {
        main: "#dda15e"
      }
    },
    typography: {
      fontFamily: "Baskervville SC, Roboto, sans-serif",
      h1: {
        fontSize: "4rem",
      }
    }
  });

  return (
    <MUIThemeProvider theme={theme}>
      {children}
    </MUIThemeProvider>
  )
}
