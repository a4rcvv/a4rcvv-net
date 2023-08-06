import BlogIndex from "@/app/blog/BlogIndex";
import { generateMyMetadata } from "@/lib/metadata";
import { getAllMetadataSerializable } from "@/lib/ssr/articles";

export const generateMetadata = () => {
  return generateMyMetadata("記事一覧", undefined, "/blog", undefined);
};

const Page = async () => {
  const metadata = getAllMetadataSerializable().filter((e) => {
    return !e.isDraft;
  });
  return <BlogIndex metadata={metadata} />;
};

export default Page;
