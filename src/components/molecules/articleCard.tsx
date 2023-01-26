import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { CreatedDate } from "@/components/molecules/createdDate";
import { UpdatedDate } from "@/components/molecules/updatedDate";
import { NextLinkComposed } from "@/lib/link";

export type ArticleCardProps = {
  id: string;
  title: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  category: string | null;
  tags: string[];
};

export const ArticleCard = (props: ArticleCardProps) => {
  const href = `/blog/${props.id}`;
  return (
    <Card variant="outlined">
      <CardActionArea component={NextLinkComposed} to={{ pathname: href }}>
        <CardHeader title={props.title} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item mobile={6}>
              <CreatedDate date={props.createdDate || ""} />
            </Grid>
            <Grid item mobile={6}>
              <UpdatedDate date={props.updatedDate || ""} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
