import ThemeRegistry from "@/app/ThemeRegistry";
import { GoogleTagManager, GTMId } from "@/lib/ga";
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
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as GTMId} />
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
