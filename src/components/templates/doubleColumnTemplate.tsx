import { Header } from "@/components/molecules/header";
import { ReactNode, useState } from "react";
import {
  Box,
  Container,
  Drawer,
  Paper,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Footer } from "@/components/molecules/footer";
import { useTheme } from "@mui/system";
import useResponsiveValue from "@/hooks/useResponsiveValue";

export type DoubleColumnTemplateProps = {
  mainContent: ReactNode;
  subContent: ReactNode;
};

export const DoubleColumnTemplate = (props: DoubleColumnTemplateProps) => {
  const theme = useTheme();
  const px = useResponsiveValue(1, 1, 2, 2);
  const pt = theme.mixins.toolbar.minHeight / 8 + 1;
  const isDesktop = useMediaQuery(() => theme.breakpoints.up("desktop"));
  const mainContentMaxWidth = theme.breakpoints.values.laptop;
  const [drawerOpened, setDrawerOpened] = useState(false);

  if (isDesktop) {
    return (
      <Box
        sx={{ minHeight: "100vh", flexDirection: "column", display: "flex" }}
      >
        <Header />
        <Container maxWidth={"desktop"} sx={{ pt: pt, px: px }}>
          <Stack direction={"row"} spacing={1} alignItems={"flex-start"}>
            <Paper sx={{ pt: 2, px: 1, pb: 2, minWidth: mainContentMaxWidth }}>
              {props.mainContent}
            </Paper>
            <Paper sx={{ pt: 2, px: 1, pb: 2 }}>{props.subContent}</Paper>
          </Stack>
        </Container>

        <Footer />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{ minHeight: "100vh", flexDirection: "column", display: "flex" }}
      >
        <Header
          drawerContent={props.subContent}
          onClickMenuIcon={() => {
            if (drawerOpened) {
              setDrawerOpened(false);
            } else {
              setDrawerOpened(true);
            }
          }}
        />
        <Container maxWidth={"laptop"} sx={{ pt: pt, px: px }}>
          <Paper sx={{ pt: 2, px: 1, pb: 2 }}>{props.mainContent}</Paper>
        </Container>
        <Drawer
          open={drawerOpened}
          anchor={"right"}
          onClose={() => {
            setDrawerOpened(false);
          }}
          PaperProps={{
            sx: {
              width: "312px",
              px: 2,
              pt: 2,
              backgroundColor: "background.default",
            },
          }}
        >
          <Paper sx={{ pt: 2, px: 1, pb: 2 }}>{props.subContent}</Paper>
        </Drawer>

        <Footer />
      </Box>
    );
  }
};
