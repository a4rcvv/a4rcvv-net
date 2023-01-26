import { createTheme, responsiveFontSizes } from "@mui/material";

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
        default: "#e0e0e0",
        paper: "#f0f0f0",
      },
    },
  });
  return responsiveFontSizes(theme, {
    breakpoints: ["mobile", "tablet", "laptop", "desktop"],
  });
};
