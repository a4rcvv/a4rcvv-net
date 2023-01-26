import { Header } from "@/components/molecules/header";
import { ReactNode } from "react";
import { Box, Container, Paper } from "@mui/material";
import { Footer } from "@/components/molecules/footer";
import { useTheme } from "@mui/system";
import useResponsiveValue from "@/hooks/useResponsiveValue";

export type SingleColumnTemplateProps = {
  mainContent: ReactNode;
};

export const SingleColumnTemplate = (props: SingleColumnTemplateProps) => {
  const theme = useTheme();
  const px = useResponsiveValue(1, 1, 2, 2);
  const pt = theme.mixins.toolbar.minHeight / 8 + 1;
  return (
    <Box sx={{ minHeight: "100vh", flexDirection: "column", display: "flex" }}>
      <Header />
      <Container maxWidth={"laptop"} sx={{ pt: pt, px: px }}>
        <Paper sx={{ pt: 2, px: 1, pb: 2 }}>{props.mainContent}</Paper>
      </Container>

      <Footer />
    </Box>
  );
};
