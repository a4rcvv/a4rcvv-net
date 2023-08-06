"use client";

import { BlogIndexProps } from "@/app/blog/BlogIndex";
import { ArticleList } from "@/components/organisms/articleList";
import { MainTemplate } from "@/components/templates/mainTemplate";
import { deserialized } from "@/lib/articles";
import { NextPage } from "next";

export type BlogTagViewPathParams = {
  tag: string;
};

export type BlogTagViewProps = {
  tag: string;
} & BlogIndexProps;

const BlogTagView: NextPage<BlogTagViewProps> = (props) => {
  const metadata = props.metadata.map((data) => {
    return deserialized(data);
  });
  return (
    <div>
      <MainTemplate
        mainContent={
          <ArticleList metadata={metadata} tagsFilter={[props.tag]} />
        }
      />
    </div>
  );
};

export default BlogTagView;
