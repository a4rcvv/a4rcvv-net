import { GetStaticProps, NextPage } from "next";
import { getAllMetadataSerializable } from "@/lib/ssr/articles";
import { ArticleList } from "@/components/organisms/articleList";
import { MainTemplate } from "@/components/templates/mainTemplate";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { TagList } from "@/components/organisms/tagList";

export type BlogIndexProps = {
  metadata: {
    id: string;
    title?: string;
    createdDate?: string;
    updatedDate?: string;
    tags: string[];
  }[];
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
    const createdDate = dayjs(data.createdDate);
    const updatedDate = dayjs(data.updatedDate);
    return {
      ...data,
      createdDate: createdDate,
      updatedDate: updatedDate,
    };
  });
  const router = useRouter();
  const tagQuery = router.query["tag"];
  console.log(router.query);
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
