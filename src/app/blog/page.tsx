import BlogIndex from "@/app/blog/BlogIndex";
import { getAllMetadataSerializable } from "@/lib/ssr/articles";

const Page = async () => {
  const metadata = getAllMetadataSerializable().filter((e) => {
    return !e.isDraft;
  });
  return <BlogIndex metadata={metadata} />;
};

export default Page;
