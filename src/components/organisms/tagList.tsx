import { ArticleMetadata } from "@/lib/types";
import { Box, Stack, Typography } from "@mui/material";
import { ArticleTag } from "@/components/atoms/articleTag";

export type TagListProps = {
  metadata: ArticleMetadata[];
};

export const TagList = (props: TagListProps) => {
  const tagCountMap: { [tag: string]: number } = {};
  props.metadata.forEach((metadata) => {
    metadata.tags.forEach((tag) => {
      if (tag in tagCountMap) {
        tagCountMap[tag]++;
      } else {
        tagCountMap[tag] = 1;
      }
    });
  });
  const tagCountArray = Object.entries(tagCountMap).sort((a, b) => b[1] - a[1]);
  return (
    <Box>
      <Typography variant={"h2"} pb={2}>
        Tags
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {tagCountArray.map(([tag, count]) => {
          return (
            <Box key={tag}>
              <ArticleTag tag={tag} postfix={`(${count})`} />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
