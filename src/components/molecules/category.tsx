import { Class } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Link from "@/lib/link";

export type CategoryProps = {
  category: string;
};

export const Category = (props: CategoryProps) => {
  const href = `/blog?category=${props.category}`;
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <Class />
      <Link href={href} color={"inherit"}>
        <Typography variant="h6">{props.category}</Typography>
      </Link>
    </Box>
  );
};
