import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Article } from "@/components/organisms/article";
import {
  getAllMetadata,
  getAllPostIds,
  getArticle,
  getArticleMetadataSerializable,
} from "@/lib/ssr/articles";
import { MainTemplate } from "@/components/templates/mainTemplate";
import { ArticleMetadataSerializable } from "@/lib/types";
import { defaultArticleSorter, deserialized } from "@/lib/articles";
import { getPageTitle } from "@/lib/getPageTitle";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths<BlogArticlePathParams> = () => {
  const ids = getAllPostIds();
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
  const prevMetadata =
    idx + 1 < allMetadata.length ? allMetadata[idx + 1] : undefined;
  const nextMetadata = idx - 1 >= 0 ? allMetadata[idx - 1] : undefined;
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
      <Head>
        <title>{getPageTitle(`${props.currentMetadata.title}`)}</title>
      </Head>
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
