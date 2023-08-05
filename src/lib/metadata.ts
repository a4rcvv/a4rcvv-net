import { getPageTitle } from "@/lib/getPageTitle";
import { Metadata } from "next";

export type OGImage = {
  url: string;
  width: number;
  height: number;
};

const getDefaultOGImage = (): OGImage => {
  const origin = process.env.NEXT_PUBLIC_URL;
  return {
    url: `${origin}/images/ogp.jpg`,
    width: 400,
    height: 400,
  };
};

export const generateMyMetadata = (
  subtitle: string | undefined,
  description: string | undefined,
  path: string | undefined,
  image: OGImage | undefined,
): Metadata => {
  const usedImage = image ?? getDefaultOGImage();
  const fullTitle = getPageTitle(subtitle);
  const url = `${process.env.NEXT_PUBLIC_URL}${path}`;
  return {
    title: fullTitle,
    description: description,
    openGraph: {
      title: fullTitle,
      url: url,
      type: "website",
      description: description,
      images: [usedImage],
      siteName: "a4rcvv.net",
    },
    twitter: {
      card: "summary",
    },
  };
};
