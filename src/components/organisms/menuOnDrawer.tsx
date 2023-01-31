import { Box, Stack, Typography } from "@mui/material";
import Link from "@/lib/link";
import { menuElements } from "@/constants";

export const MenuOnDrawer = () => {
  return (
    <Box>
      <Typography variant={"h2"} sx={{ mb: 1 }}>
        Menu
      </Typography>
      <Stack direction={"column"} spacing={1} alignItems={"flex-start"}>
        {menuElements.map((element) => {
          return (
            <Link
              key={element.href}
              href={{ pathname: element.href }}
              color={"inherit"}
              underline={"hover"}
            >
              <Typography variant={"h4"}>{element.name}</Typography>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};
