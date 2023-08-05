"use client";

import { BlogIndexProps } from "@/app/blog/BlogIndex";
import { ArticleList } from "@/components/organisms/articleList";
import { MainTemplate } from "@/components/templates/mainTemplate";
// import { MyHead } from "@/lib/MyHead";
import { deserialized } from "@/lib/articles";
import { getPageTitle } from "@/lib/getPageTitle";
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
      {/* <MyHead title={getPageTitle(`Tag: ${props.tag}`)} /> */}
      <MainTemplate
        mainContent={
          <ArticleList metadata={metadata} tagsFilter={[props.tag]} />
        }
      />
    </div>
  );
};

export default BlogTagView;
