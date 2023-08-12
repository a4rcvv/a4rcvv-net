import ThemeRegistry from "@/app/ThemeRegistry";
import { GAId, GoogleTagManager } from "@/lib/ga";
import { config } from "@fortawesome/fontawesome-svg-core";

import "./globals.css";

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

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <GoogleTagManager gaId={process.env.NEXT_PUBLIC_GA_ID as GAId} />
      </head>
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
