import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

import { Theme } from "@mui/material/styles";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

export default createTheme({
  typography: {
    fontFamily: "Cera Round Pro, Arial",
  },
  palette: {
    primary: {
      main: "#1976D2",
      900: "#367C30",
    },
    secondary: blue,
    background: {
      default: "#F8F9FA",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
  },
});
