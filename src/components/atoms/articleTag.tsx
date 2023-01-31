import { NextLinkComposed } from "@/lib/link";
import { Card, CardActionArea, Typography, useTheme } from "@mui/material";

export type TagProps = {
  tag: string;
  postfix?: string;
};

export const ArticleTag = (props: TagProps) => {
  const theme = useTheme();
  return (
    <Card variant={"outlined"}>
      <CardActionArea
        component={NextLinkComposed}
        to={{ pathname: `/blog/tag/${props.tag}` }}
      >
        <Typography
          sx={{ backgroundColor: theme.palette.background.default, px: 1 }}
        >
          {`${props.tag} ${props.postfix ?? ""}`}
        </Typography>
      </CardActionArea>
    </Card>
    // <Link
    //   href={{ pathname: `/blog/tag/${props.tag}` }}
    //   underline={"hover"}
    //   color={"inherit"}
    // >
    //   <Typography
    //     sx={{ backgroundColor: theme.palette.background.default, px: 1 }}
    //   >
    //     {`${props.tag} ${props.postfix ?? ""}`}
    //   </Typography>
    // </Link>
  );
};
