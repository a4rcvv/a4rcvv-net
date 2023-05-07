import { Dayjs } from "dayjs";

export type ArticleMetadata = {
  id: string;
  title?: string;
  createdDate?: Dayjs;
  updatedDate?: Dayjs;
  tags: string[];
  isDraft?: boolean; // default: false
};

export type ArticleMetadataSerializable = {
  id: string;
  title: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  tags: string[];
  isDraft: boolean;
};
