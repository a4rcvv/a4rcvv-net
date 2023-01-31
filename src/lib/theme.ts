import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, blueGrey, deepPurple, grey } from "@mui/material/colors";

export const getTheme = () => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        '"Helvetica Neue"',
        "Arial",
        '"Hiragino Kaku Gothic ProN"',
        '"Hiragino Sans"',
        "Meiryo",
        "sans-serif",
      ].join(","),
      fontSize: 13,
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 520,
        laptop: 960,
        desktop: 1280,
      },
    },
    palette: {
      background: {
        default: blueGrey[100],
        paper: grey[200],
      },
      primary: { main: blue[200] },
      secondary: { main: deepPurple[200] },
      text: {
        primary: grey[800],
        secondary: grey[600],
        disabled: grey[400],
      },
    },
  });
  return responsiveFontSizes(theme, {
    breakpoints: ["mobile", "tablet", "laptop", "desktop"],
  });
};
