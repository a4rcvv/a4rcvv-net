import { TwitterShareButton } from "@/components/atoms/twitterShareButton";
import { ArticleNavigation } from "@/components/molecules/articleNavigation";
import { CreatedDate } from "@/components/molecules/createdDate";
import { MaterialReactMarkdown } from "@/components/molecules/materialReactMarkdown";
import { ShareButtons } from "@/components/molecules/shareButtons";
import { Tags } from "@/components/molecules/tags";
import { UpdatedDate } from "@/components/molecules/updatedDate";
import { ArticleMetadata } from "@/lib/types";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import "katex/dist/katex.min.css";
import { usePathname } from "next/navigation";
import React from "react";

export type ArticleProps = {
  markdownString?: string;
  currentMetadata: ArticleMetadata;
  nextMetadata?: ArticleMetadata;
  previousMetadata?: ArticleMetadata;
};

export const Article = (props: ArticleProps) => {
  const theme = useTheme();
  const pathname = usePathname();
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
        url={`${process.env.NEXT_PUBLIC_URL}${pathname}`}
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
