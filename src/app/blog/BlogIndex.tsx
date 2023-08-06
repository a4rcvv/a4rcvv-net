"use client";

import { ArticleList } from "@/components/organisms/articleList";
import { TagList } from "@/components/organisms/tagList";
import { MainTemplate } from "@/components/templates/mainTemplate";
import { deserialized } from "@/lib/articles";
import { ArticleMetadataSerializable } from "@/lib/types";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";

export type BlogIndexProps = {
  metadata: ArticleMetadataSerializable[];
};

const BlogIndex: NextPage<BlogIndexProps> = (props) => {
  const metadata = props.metadata.map((data) => {
    return deserialized(data);
  });
  const params = useSearchParams();
  const tagQuery = params.get("tag");
  let tags: string[] = [];
  if (typeof tagQuery == "string") {
    tags = [tagQuery];
  } else if (Array.isArray(tagQuery)) {
    tags = tagQuery;
  }
  return (
    <div>
      <MainTemplate
        mainContent={<ArticleList metadata={metadata} tagsFilter={tags} />}
        subContents={[<TagList metadata={metadata} key={0} />]}
      ></MainTemplate>
    </div>
  );
};

export default BlogIndex;
