import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Article } from "@/components/organisms/article";
import { getAllPostIds, getArticle } from "@/lib/articles";
import { SingleColumnTemplate } from "@/components/templates/singleColumnTemplate";

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

  return {
    props: {
      id: id,
      content: article.content,
      metadata: {
        title: article.metadata["title"] || null,
        createdDate: article.metadata["createdDate"] || null,
        updatedDate: article.metadata["updatedDate"] || null,
        category: article.metadata["category"] || null,
        tags: article.metadata["tags"] || [],
      },
    },
  };
};

export type BlogArticleProps = {
  id: string;
  content: string;
  metadata: {
    title: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    category: string | null;
    tags: string[];
  };
};

export type BlogArticlePathParams = {
  id: string;
};

const BlogArticle: NextPage<BlogArticleProps> = (props: BlogArticleProps) => {
  return (
    <SingleColumnTemplate
      mainContent={
        <Article
          markdownString={props.content}
          title={props.metadata.title}
          createdDate={props.metadata.createdDate}
          updatedDate={props.metadata.updatedDate}
          category={props.metadata.category}
          tags={[]}
        />
      }
    />
  );
};

export default BlogArticle;
