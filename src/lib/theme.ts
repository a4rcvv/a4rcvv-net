import { alpha, createTheme, responsiveFontSizes } from "@mui/material";

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
        default: "#cfd8dc",
        paper: "#eeeeee",
      },
      primary: { main: "#90caf9" },
      secondary: { main: "#b39ddb" },
      text: {
        primary: "#424242",
        secondary: "#757575",
        disabled: "#bdbdbd",
      },
    },
  });
  return responsiveFontSizes(theme, {
    breakpoints: ["mobile", "tablet", "laptop", "desktop"],
  });
};
