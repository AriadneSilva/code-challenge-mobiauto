import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#5d00bf",
    },
    secondary: {
      main: "#00bcba",
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "caption" } /* component props */,
          style: {
            fontSize: 12,
            color: "#9f9e9e",
          },
        },
      ],
    },
  },
});
export default theme;
