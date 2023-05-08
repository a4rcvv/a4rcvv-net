import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Article } from "@/components/organisms/article";
import {
  getAllMetadata,
  getAllPostIds,
  getArticle,
  getArticleMetadata,
  getArticleMetadataSerializable,
} from "@/lib/ssr/articles";
import { MainTemplate } from "@/components/templates/mainTemplate";
import { ArticleMetadata, ArticleMetadataSerializable } from "@/lib/types";
import { defaultArticleSorter, deserialized } from "@/lib/articles";
import { getPageTitle } from "@/lib/getPageTitle";
import { MyHead } from "@/lib/MyHead";

export const getStaticPaths: GetStaticPaths<BlogArticlePathParams> = () => {
  const ids = getAllPostIds().filter((id) => {
    return !getArticleMetadata(id).isDraft;
  });
  return {
    paths: ids.map((id) => {
      return {
        params: {
          id: id,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogArticleProps> = (context) => {
  const { id } = context.params as BlogArticlePathParams;
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

  return {
    props: {
      content: article.content,
      currentMetadata: getArticleMetadataSerializable(id),
      previousMetadata:
        prevMetadata !== undefined
          ? getArticleMetadataSerializable(prevMetadata?.id)
          : null,
      nextMetadata:
        nextMetadata !== undefined
          ? getArticleMetadataSerializable(nextMetadata.id)
          : null,
    },
  };
};

export type BlogArticleProps = {
  content: string;
  currentMetadata: ArticleMetadataSerializable;
  previousMetadata: ArticleMetadataSerializable | null;
  nextMetadata: ArticleMetadataSerializable | null;
};

export type BlogArticlePathParams = {
  id: string;
};

const BlogArticle: NextPage<BlogArticleProps> = (props: BlogArticleProps) => {
  return (
    <div>
      <MyHead title={getPageTitle(`${props.currentMetadata.title}`)} />
      <MainTemplate
        mainContent={
          <Article
            currentMetadata={deserialized(props.currentMetadata)}
            nextMetadata={
              props.nextMetadata !== null
                ? deserialized(props.nextMetadata)
                : undefined
            }
            previousMetadata={
              props.previousMetadata !== null
                ? deserialized(props.previousMetadata)
                : undefined
            }
            markdownString={props.content}
          />
        }
      />
    </div>
  );
};

export default BlogArticle;
