import "katex/dist/katex.min.css";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { CreatedDate } from "@/components/molecules/createdDate";
import { UpdatedDate } from "@/components/molecules/updatedDate";
import { TwitterShareButton } from "@/components/atoms/twitterShareButton";
import { ShareButtons } from "@/components/molecules/shareButtons";
import { useRouter } from "next/router";
import React from "react";
import { MaterialReactMarkdown } from "@/components/molecules/materialReactMarkdown";
import { Tags } from "@/components/molecules/tags";
import { ArticleMetadata } from "@/lib/types";
import { ArticleNavigation } from "@/components/molecules/articleNavigation";

export type ArticleProps = {
  markdownString?: string;
  currentMetadata: ArticleMetadata;
  nextMetadata?: ArticleMetadata;
  previousMetadata?: ArticleMetadata;
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
      <Typography variant="h1" sx={{ mb: 2 }}>
        {props.currentMetadata.title}
      </Typography>
      <Tags tags={props.currentMetadata.tags} />
      <Stack direction="row" spacing={2} sx={{ my: 1 }}>
        <CreatedDate
          date={props.currentMetadata.createdDate?.format("YYYY/MM/DD") || ""}
        />
        <UpdatedDate
          date={props.currentMetadata.updatedDate?.format("YYYY/MM/DD") || ""}
        />
      </Stack>
      <Divider />
      <MaterialReactMarkdown markdownString={props.markdownString} />
      <Divider />
      <ShareButtons
        twitterProps={twitterShareButtonProps}
        url={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
        text={props.currentMetadata.title}
      />
      <Box sx={{ mt: 1 }}>
        <ArticleNavigation
          style={"vertical"}
          previousMetadata={props.previousMetadata}
          nextMetadata={props.nextMetadata}
        />
      </Box>
    </Box>
  );
};
