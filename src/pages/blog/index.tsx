import { GetStaticProps, NextPage } from "next";
import { getAllMetadataSerializable } from "@/lib/ssr/articles";
import { ArticleList } from "@/components/organisms/articleList";
import { MainTemplate } from "@/components/templates/mainTemplate";
import { useRouter } from "next/router";
import { TagList } from "@/components/organisms/tagList";
import { ArticleMetadataSerializable } from "@/lib/types";
import { deserialized } from "@/lib/articles";

export type BlogIndexProps = {
  metadata: ArticleMetadataSerializable[];
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = () => {
  const metadata = getAllMetadataSerializable();
  return {
    props: {
      metadata: metadata,
    },
  };
};

const BlogIndex: NextPage<BlogIndexProps> = (props) => {
  const metadata = props.metadata.map((data) => {
    return deserialized(data);
  });
  const router = useRouter();
  const tagQuery = router.query["tag"];
  let tags: string[] = [];
  if (typeof tagQuery == "string") {
    tags = [tagQuery];
  } else if (Array.isArray(tagQuery)) {
    tags = tagQuery;
  }
  return (
    <MainTemplate
      mainContent={<ArticleList metadata={metadata} tagsFilter={tags} />}
      subContents={[<TagList metadata={metadata} key={0} />]}
    ></MainTemplate>
  );
};

export default BlogIndex;
