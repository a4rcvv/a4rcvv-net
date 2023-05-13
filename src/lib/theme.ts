import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, blueGrey, grey, indigo } from "@mui/material/colors";

export const getTheme = () => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        '"Hiragino Kaku Gothic ProN"',
        '"Hiragino Sans"',
        "Meiryo",
        "sans-serif",
      ].join(","),
      fontSize: 14,
      h1: {
        fontSize: "4rem",
      },
      h2: {
        fontSize: "3rem",
      },
      h3: {
        fontSize: "2rem",
      },
      h4: {
        fontSize: "1.5rem",
      },
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
        paper: grey[50],
      },
      primary: { main: blue[200] },
      secondary: { main: indigo[200] },
    },
  });
  return responsiveFontSizes(theme, {
    breakpoints: ["mobile", "tablet", "laptop", "desktop"],
  });
};
