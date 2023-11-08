import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#F1B4BB",
      dark: "#A87D82",
      light: "#F3C3C8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1F4172",
      dark: "#A87D82",
      light: "#F3C3C8",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    background: {
      paper: "#ffffff",
      default: "#F9F7F7",
    },
    text: {
      primary: "#F1B4BB",
      secondary: "#A87D82",
    },
  },
});
