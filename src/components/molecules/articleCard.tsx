import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { CreatedDate } from "@/components/molecules/createdDate";
import { UpdatedDate } from "@/components/molecules/updatedDate";
import { NextLinkComposed } from "@/lib/link";
import { ArticleMetadata } from "@/lib/types";
import { Tags } from "@/components/molecules/tags";

export type ArticleCardProps = ArticleMetadata;

export const ArticleCard = (props: ArticleCardProps) => {
  const href = `/blog/entry/${props.id}`;
  return (
    <Card variant={"outlined"}>
      <CardActionArea component={NextLinkComposed} to={{ pathname: href }}>
        <CardContent>
          <Typography variant={"h5"}>{props.title}</Typography>
          <Stack spacing={2} direction={"row"} sx={{ mt: 1 }}>
            <CreatedDate date={props.createdDate?.format("YYYY/MM/DD") || ""} />
            <UpdatedDate date={props.updatedDate?.format("YYYY/MM/DD") || ""} />
          </Stack>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardContent>
        <Tags tags={props.tags} />
      </CardContent>
    </Card>
  );
};
