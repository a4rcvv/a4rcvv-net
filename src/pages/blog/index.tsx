import { GetStaticProps, NextPage } from "next";
import { getAllPostIds, getArticle } from "@/lib/articles";
import { ArticleList } from "@/components/organisms/articleList";
import { DoubleColumnTemplate } from "@/components/templates/doubleColumnTemplate";

export type BlogIndexProps = {
  metadata: {
    id: string;
    title: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    category: string | null;
    tags: string[];
  }[];
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = () => {
  const ids = getAllPostIds();
  const metadata = ids.map((id) => {
    const article = getArticle(id);
    return {
      id: id,
      title: (article.metadata["title"] as string) || null,
      createdDate: (article.metadata["createdDate"] as string) || null,
      updatedDate: (article.metadata["updatedDate"] as string) || null,
      category: (article.metadata["category"] as string) || null,
      tags: article.metadata["tags"] || [],
    };
  });
  return {
    props: {
      metadata: metadata,
    },
  };
};

const BlogIndex: NextPage<BlogIndexProps> = (props) => {
  return (
    <DoubleColumnTemplate
      mainContent={<ArticleList metadata={props.metadata} />}
      subContent={<ArticleList metadata={props.metadata} />}
    ></DoubleColumnTemplate>
  );
};

export default BlogIndex;
