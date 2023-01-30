import { Dayjs } from "dayjs";

export type ArticleMetadata = {
  id: string;
  title?: string;
  createdDate?: Dayjs;
  updatedDate?: Dayjs;
  tags: string[];
};

export type ArticleMetadataSerializable = {
  id: string;
  title: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  tags: string[];
};
