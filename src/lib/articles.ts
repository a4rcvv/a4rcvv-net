import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
