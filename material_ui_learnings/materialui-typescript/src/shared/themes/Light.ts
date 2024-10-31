import { createTheme } from "@mui/material";
import { common, cyan, yellow } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[700],
      contrastText: "#ffffff",
    },
    secondary: {
      main: cyan[500],
      dark: cyan[300],
      light: cyan[300],
      contrastText: "#ffffff",
    },
    background: {
      paper: "#ffffff",
      default: "#f7f6f3",
    },
  },
});
