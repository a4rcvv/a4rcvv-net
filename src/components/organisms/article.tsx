import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import { Container, Stack, Typography } from "@mui/material";
import { CreatedDate } from "@/components/molecules/createdDate";
import { UpdatedDate } from "@/components/molecules/updatedDate";
import { Category } from "@/components/molecules/category";

export type MdModuleProps = {
  markdownString: string;
  title: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  category: string | null;
  tags: string[];
};

export const Article = (props: MdModuleProps) => {
  return (
    <Container>
      <Typography variant="h2">{props.title}</Typography>
      <Stack direction="row" spacing={2}>
        <Category category={props.category || ""} />
        <CreatedDate date={props.createdDate || ""} />
        <UpdatedDate date={props.updatedDate || ""} />
      </Stack>
      <ReactMarkdown
        rehypePlugins={[rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath]}
      >
        {props.markdownString}
      </ReactMarkdown>
    </Container>
  );
};
