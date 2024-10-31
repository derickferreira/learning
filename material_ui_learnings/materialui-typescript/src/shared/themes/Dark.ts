import { createTheme } from "@mui/material";
import { cyan, yellow, common } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
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
      paper: "##303134",
      default: "#202124",
    },
  },
  typography: {
    allVariants: {
      color: common.white,
    },
  },
});
