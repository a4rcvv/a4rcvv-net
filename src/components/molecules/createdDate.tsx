import { Box, Typography } from "@mui/material";
import { Create } from "@mui/icons-material";

export type CreatedDateProps = {
  date: string;
};

export const CreatedDate = (props: CreatedDateProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <Create />
      <Typography variant="body1">{props.date}</Typography>
    </Box>
  );
};
