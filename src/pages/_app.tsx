import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getTheme } from "@/lib/theme";

config.autoAddCss = false;

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const theme = getTheme();
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CssBaseline>
  );
}

export default MyApp;
