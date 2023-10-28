import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#ba0e11",
    },
    secondary: {
      main: "#00bcba",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});
export default theme;
