import { Box, Stack, Typography } from "@mui/material";
import Link from "@/lib/link";

export const ContentOnDrawer = () => {
  return (
    <Box>
      <Typography variant={"h2"} sx={{ mb: 1 }}>
        Contents
      </Typography>
      <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
        <Link
          href={{ pathname: "/blog" }}
          color={"inherit"}
          underline={"hover"}
        >
          <Typography variant={"h4"}>Blog</Typography>
        </Link>
        <Link
          href={{ pathname: "/contact" }}
          color={"inherit"}
          underline={"hover"}
        >
          <Typography variant={"h4"}>Contact</Typography>
        </Link>
      </Stack>
    </Box>
  );
};
