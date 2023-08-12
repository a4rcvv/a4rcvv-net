import Script from "next/script";

export type GTMId = `GTM-${string}`;
export type GAId = `G-${string}`;
type GoogleTagManagerProps = {
  gaId: GAId;
};

export const GoogleTagManager = (props: GoogleTagManagerProps) => {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${props.gaId}`}
      ></Script>
      <Script id="ga">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${props.gaId}');`}
      </Script>
    </>
  );
};
