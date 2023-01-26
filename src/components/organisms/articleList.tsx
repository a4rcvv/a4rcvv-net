import { Box, Grid, Typography } from "@mui/material";
import { ArticleCard } from "@/components/molecules/articleCard";

export type ArticleListProps = {
  metadata: {
    id: string;
    title: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    category: string | null;
    tags: string[];
  }[];
};

export const ArticleList = (props: ArticleListProps) => {
  return (
    <Box>
      <Typography variant={"h1"} pb={4}>
        Blog
      </Typography>
      <Grid container spacing={2}>
        {props.metadata.map((metadata) => {
          return (
            <Grid item mobile={12} key={metadata.id}>
              <ArticleCard
                id={metadata.id}
                title={metadata.title}
                createdDate={metadata.createdDate}
                updatedDate={metadata.updatedDate}
                category={metadata.category}
                tags={metadata.tags}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
