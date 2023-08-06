import BlogArticle from "@/app/blog/entry/[id]/BlogArticle";
import { defaultArticleSorter } from "@/lib/articles";
import { generateMyMetadata } from "@/lib/metadata";
import {
  getAllMetadata,
  getAllPostIds,
  getArticle,
  getArticleMetadata,
  getArticleMetadataSerializable,
} from "@/lib/ssr/articles";
import { ArticleMetadata } from "@/lib/types";

export const generateStaticParams = () => {
  const ids = getAllPostIds().filter((id) => {
    return !getArticleMetadata(id).isDraft;
  });

  return ids.map((id) => {
    return {
      id: id,
    };
  });
};

export const generateMetadata = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const contentMetadata = getArticleMetadata(id);
  return generateMyMetadata(
    contentMetadata.title,
    undefined,
    `/blog/entry/${id}`,
    undefined,
  );
};

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const article = getArticle(id);
  const allMetadata = getAllMetadata().sort(defaultArticleSorter);
  const idx = allMetadata.findIndex((element) => element.id == id);

  let prevMetadata: ArticleMetadata | undefined = undefined;
  for (let i = idx + 1; i < allMetadata.length; i++) {
    if (!allMetadata[i].isDraft) {
      prevMetadata = allMetadata[i];
      break;
    }
  }

  let nextMetadata: ArticleMetadata | undefined = undefined;
  for (let i = idx - 1; i >= 0; i--) {
    if (!allMetadata[i].isDraft) {
      nextMetadata = allMetadata[i];
      break;
    }
  }

  return (
    <BlogArticle
      content={article.content}
      currentMetadata={getArticleMetadataSerializable(id)}
      previousMetadata={
        prevMetadata !== undefined
          ? getArticleMetadataSerializable(prevMetadata?.id)
          : null
      }
      nextMetadata={
        nextMetadata !== undefined
          ? getArticleMetadataSerializable(nextMetadata.id)
          : null
      }
    />
  );
};

export default Page;
