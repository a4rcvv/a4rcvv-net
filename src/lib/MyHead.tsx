import Head from "next/head";
import { useRouter } from "next/router";

export type MyHeadProps = {
  title: string;
  description?: string;
  image?: {
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
  };
};

export const MyHead = (props: MyHeadProps) => {
  const router = useRouter();
  const origin = process.env.NEXT_PUBLIC_URL;
  const url = origin + router.asPath;
  const image = props.image ?? {
    imageUrl: "/images/ogp.jpg",
    imageWidth: 400,
    imageHeight: 400,
  };
  return (
    <Head>
      <title>{props.title}</title>
      <meta property="og:title" content={props.title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={"a4rcvv.net"} />
      {props.description && (
        <meta property="og:description" content={props.description} />
      )}
      <meta property="og:image" content={image.imageUrl} />
      <meta property="og:image:width" content={image.imageWidth.toString()} />
      <meta property="og:image:height" content={image.imageHeight.toString()} />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
};
