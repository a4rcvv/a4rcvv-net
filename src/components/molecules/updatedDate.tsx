import { Box, Typography } from "@mui/material";
import { Update } from "@mui/icons-material";

export type UpdatedDateProps = {
  date: string;
};

export const UpdatedDate = (props: UpdatedDateProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <Update />
      <Typography variant="h6">{props.date}</Typography>
    </Box>
  );
};
