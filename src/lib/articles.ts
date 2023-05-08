import { ArticleMetadata, ArticleMetadataSerializable } from "@/lib/types";
import dayjs from "dayjs";

export const deserialized = (
  serializable: ArticleMetadataSerializable,
): ArticleMetadata => {
  return {
    title: serializable.title == null ? undefined : serializable.title,
    id: serializable.id,
    tags: serializable.tags,
    createdDate: dayjs(serializable.createdDate),
    updatedDate: dayjs(serializable.updatedDate),
    isDraft: serializable.isDraft,
  };
};
export const defaultArticleSorter = (
  a: ArticleMetadata,
  b: ArticleMetadata,
) => {
  const aCreatedDate = a.createdDate ?? dayjs(0);
  const bCreatedDate = b.createdDate ?? dayjs(0);
  const aTitle = a.title ?? "";
  const bTitle = b.title ?? "";
  if (aCreatedDate < bCreatedDate) {
    return 1;
  } else if (aCreatedDate > bCreatedDate) {
    return -1;
  }
  if (aTitle < bTitle) {
    return 1;
  } else if (aTitle > bTitle) {
    return -1;
  }
  return 0;
};
