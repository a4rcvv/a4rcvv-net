import BlogTagView from "@/app/blog/tag/[tag]/BlogTagView";
import { generateMyMetadata } from "@/lib/metadata";
import {
  getAllPostIds,
  getArticle,
  getArticleMetadataSerializable,
} from "@/lib/ssr/articles";

export const generateStaticParams = () => {
  const ids = getAllPostIds();
  const tags: Set<string> = new Set();
  ids.forEach((id) => {
    const article = getArticle(id);
    const articleTags: string[] | undefined = article.metadata["tags"];
    articleTags?.forEach((tag) => {
      tags.add(tag);
    });
  });

  return [...tags].map((tag) => {
    return {
      tag: tag,
    };
  });
};

export const generateMetadata = ({ params }: { params: { tag: string } }) => {
  const tag = params.tag;
  return generateMyMetadata(
    `Tag: ${tag}`,
    undefined,
    `/blog/tag/${tag}`,
    undefined,
  );
};

const Page = async ({ params }: { params: { tag: string } }) => {
  const tag = params.tag;
  const ids = getAllPostIds();
  const metadata = ids.map((id) => {
    return getArticleMetadataSerializable(id);
  });
  return <BlogTagView tag={tag} metadata={metadata} />;
};

export default Page;
