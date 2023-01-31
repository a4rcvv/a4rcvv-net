import { Box, Stack } from "@mui/material";
import Tag from "@mui/icons-material/Tag";
import { ArticleTag } from "@/components/atoms/articleTag";

export type TagsProps = {
  tags: string[];
  disableIcon?: boolean;
};

export const Tags = (props: TagsProps) => {
  const showIcon = !props.disableIcon ?? true;
  return (
    // <Box sx={{ display: "flex" }}>
    //   {showIcon ? <Tag /> : null}
    //   {props.tags.map((tag) => {
    //     return (
    //       <Box key={tag} sx={{ mr: 1 }}>
    //         <ArticleTag tag={tag} />
    //       </Box>
    //     );
    //   })}
    // </Box>
    <Stack
      direction={"row"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      sx={{ flexWrap: "wrap", gap: 1 }}
    >
      {showIcon ? <Tag /> : null}
      {props.tags.map((tag) => {
        return (
          <Box key={tag}>
            <ArticleTag tag={tag} />
          </Box>
        );
      })}
    </Stack>
  );
};
