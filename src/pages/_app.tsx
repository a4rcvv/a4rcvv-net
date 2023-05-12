import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getTheme } from "@/lib/theme";
import { GTMId, GoogleTagManager } from "@/lib/ga";
// import Script from "next/script";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { pageView } from "@/lib/ga";

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
  // const router = useRouter();
  // useEffect(() => {
  //   const onRouterChanged = (url: string) => {
  //     pageView(url);
  //   };
  //   router.events.on("routeChangeComplete", onRouterChanged);
  //   return () => {
  //     router.events.off("routeChangeComplete", onRouterChanged);
  //   };
  // }, [router.events]);
  return (
    <>
      {/*<Script*/}
      {/*  strategy={"afterInteractive"}*/}
      {/*  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}*/}
      {/*/>*/}
      {/*<Script*/}
      {/*  id={"gtag-init"}*/}
      {/*  strategy={"afterInteractive"}*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: `*/}
      {/*    window.dataLayer = window.dataLayer || [];*/}
      {/*    function gtag(){dataLayer.push(arguments)};*/}
      {/*    gtag('js', new Date());*/}
      {/*    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');*/}
      {/*    `,*/}
      {/*  }}*/}
      {/*/>*/}
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as GTMId} />
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CssBaseline>
    </>
  );
}

export default MyApp;
