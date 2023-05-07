import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  getAllPostIds,
  getArticle,
  getArticleMetadataSerializable,
} from "@/lib/ssr/articles";
import { BlogIndexProps } from "@/pages/blog";
import { ArticleList } from "@/components/organisms/articleList";
import { MainTemplate } from "@/components/templates/mainTemplate";
import { deserialized } from "@/lib/articles";
import { getPageTitle } from "@/lib/getPageTitle";
import Head from "next/head";

export type BlogTagViewPathParams = {
  tag: string;
};

export type BlogTagViewProps = {
  tag: string;
} & BlogIndexProps;

export const getStaticPaths: GetStaticPaths<BlogTagViewPathParams> = () => {
  const ids = getAllPostIds();
  const tags: Set<string> = new Set();
  ids.forEach((id) => {
    const article = getArticle(id);
    const articleTags: string[] | undefined = article.metadata["tags"];
    articleTags?.forEach((tag) => {
      tags.add(tag);
    });
  });
  return {
    paths: [...tags].map((tag) => {
      return {
        params: {
          tag: tag,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogTagViewProps> = (context) => {
  const { tag } = context.params as BlogTagViewPathParams;
  const ids = getAllPostIds();
  const metadata = ids.map((id) => {
    return getArticleMetadataSerializable(id);
  });
  return {
    props: {
      tag: tag,
      metadata: metadata,
    },
  };
};

const BlogTagView: NextPage<BlogTagViewProps> = (props) => {
  const metadata = props.metadata.map((data) => {
    return deserialized(data);
  });
  return (
    <div>
      <Head>
        <title>{getPageTitle(`Tag: ${props.tag}`)}</title>
      </Head>
      <MainTemplate
        mainContent={
          <ArticleList metadata={metadata} tagsFilter={[props.tag]} />
        }
      />
    </div>
  );
};

export default BlogTagView;
