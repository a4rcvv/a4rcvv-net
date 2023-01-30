import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { ArticleCard } from "@/components/molecules/articleCard";
import { ArticleMetadata } from "@/lib/types";
import { Tags } from "@/components/molecules/tags";
import { Cancel } from "@mui/icons-material";
import { NextLinkComposed } from "@/lib/link";
import { useState } from "react";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { defaultArticleSorter } from "@/lib/articles";

export type ArticleListProps = {
  metadata: ArticleMetadata[];
  tagsFilter?: string[];
};

export const ArticleList = (props: ArticleListProps) => {
  const filterFunction = (article: ArticleMetadata) => {
    if (props.tagsFilter !== undefined) {
      let hasAllTags = true;
      props.tagsFilter.forEach((tag) => {
        if (article.tags.find((element) => element == tag) === undefined) {
          hasAllTags = false;
        }
      });
      return hasAllTags;
    } else return true;
  };

  const nArticlesInPage = 10;
  const metadata = props.metadata
    .filter(filterFunction)
    .sort(defaultArticleSorter);
  const siblingCount = useResponsiveValue(0, 1, 1, 1);
  const nPages = Math.ceil(metadata.length / nArticlesInPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * nArticlesInPage;
  const endIdx = startIdx + nArticlesInPage;
  const shownMetadata = metadata.slice(startIdx, endIdx);
  return (
    <Box>
      <Typography variant={"h1"} pb={2}>
        Blog
      </Typography>
      {props.tagsFilter && props.tagsFilter.length > 0 ? (
        <Box display={"flex"} alignItems={"center"} sx={{ pb: 1 }}>
          <Typography variant={"body1"}>Filtered by:</Typography>
          <Tags tags={props.tagsFilter} disableIcon />
          <IconButton component={NextLinkComposed} to={{ pathname: "/blog" }}>
            <Cancel />
          </IconButton>
        </Box>
      ) : null}
      <Stack spacing={1}>
        {shownMetadata.map((metadata) => {
          return (
            <ArticleCard
              key={metadata.id}
              id={metadata.id}
              title={metadata.title}
              createdDate={metadata.createdDate}
              updatedDate={metadata.updatedDate}
              tags={metadata.tags}
            />
          );
        })}
      </Stack>
      <Stack alignItems={"center"} sx={{ mt: 1 }}>
        <Pagination
          count={nPages}
          onChange={(event, page) => {
            setCurrentPage(page);
          }}
          siblingCount={siblingCount}
        />
      </Stack>
    </Box>
  );
};
