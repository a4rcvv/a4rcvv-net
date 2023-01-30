import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArticleMetadataSerializable } from "@/lib/types";
import { deserialized } from "@/lib/articles";

export const articlesDirectory = "resources/articles";
export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
};
export const getArticle = (id: string) => {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(file);
  return {
    id: id,
    content: matterResult.content,
    metadata: matterResult.data,
  };
};
export const getAllMetadataSerializable = () => {
  const ids = getAllPostIds();
  return ids.map((id) => {
    return getArticleMetadataSerializable(id);
  });
};
export const getAllMetadata = () => {
  const all = getAllMetadataSerializable();
  return all.map((serializable) => {
    return deserialized(serializable);
  });
};
export const getArticleMetadataSerializable = (
  id: string,
): ArticleMetadataSerializable => {
  const article = getArticle(id);
  const createdDateString = article.metadata["createdDate"].toString();
  const updatedDateString = article.metadata["updatedDate"].toString();
  return {
    id: id,
    title: article.metadata["title"] as string,
    createdDate: createdDateString,
    updatedDate: updatedDateString,
    tags: article.metadata["tags"] || [],
  };
};
