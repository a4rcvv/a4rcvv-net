import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { CreatedDate } from "@/components/molecules/createdDate";
import { UpdatedDate } from "@/components/molecules/updatedDate";
import { Category } from "@/components/molecules/category";
import { TwitterShareButton } from "@/components/atoms/twitterShareButton";
import { ShareButtons } from "@/components/molecules/shareButtons";
import { useRouter } from "next/router";
import React from "react";

export type ArticleProps = {
  markdownString?: string;
  title?: string;
  createdDate?: string;
  updatedDate?: string;
  category?: string;
  tags?: string[];
};

export const Article = (props: ArticleProps) => {
  const theme = useTheme();
  const router = useRouter();
  const twitterShareButtonProps: React.ComponentProps<
    typeof TwitterShareButton
  > = {
    fontAwesomeIconProps: {
      color: theme.palette.text.primary,
    },
    iconButtonProps: {
      size: "large",
    },
  };
  return (
    <Box>
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
        {props.markdownString ?? ""}
      </ReactMarkdown>
      <Divider />
      <ShareButtons
        twitterProps={twitterShareButtonProps}
        url={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
        text={props.title}
      />
    </Box>
  );
};
