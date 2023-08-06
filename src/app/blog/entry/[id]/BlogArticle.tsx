"use client";
import { Article } from "@/components/organisms/article";
import { MainTemplate } from "@/components/templates/mainTemplate";
import { deserialized } from "@/lib/articles";
import { ArticleMetadataSerializable } from "@/lib/types";
import { NextPage } from "next";

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
