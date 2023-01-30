import Link from "@/lib/link";
import { Typography, useTheme } from "@mui/material";

export type TagProps = {
  tag: string;
  postfix?: string;
};

export const ArticleTag = (props: TagProps) => {
  const theme = useTheme();
  return (
    <Link
      href={{ pathname: `/blog/tag/${props.tag}` }}
      underline={"hover"}
      color={"inherit"}
    >
      <Typography
        sx={{ backgroundColor: theme.palette.background.default, px: 1 }}
      >
        {`${props.tag} ${props.postfix ?? ""}`}
      </Typography>
    </Link>
  );
};
