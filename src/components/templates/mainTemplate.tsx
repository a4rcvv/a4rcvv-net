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
import { MenuOnDrawer } from "@/components/organisms/menuOnDrawer";

export type DoubleColumnTemplateProps = {
  mainContent: ReactNode;
  subContents?: ReactNode[];
};

export const MainTemplate = (props: DoubleColumnTemplateProps) => {
  const theme = useTheme();
  const p = useResponsiveValue(1, 2, 2, 4);
  const pt = theme.mixins.toolbar.minHeight / 8 + p;
  const isTablet = useMediaQuery(() => theme.breakpoints.only("tablet"));
  const isMobile = useMediaQuery(() => theme.breakpoints.only("mobile"));
  const [drawerOpened, setDrawerOpened] = useState(false);

  // desktop, laptop: 2カラム
  // tablet: 1カラム
  // mobile: 1カラム，Headerをドロワーに圧縮

  if (isMobile || isTablet) {
    return (
      <Box
        sx={{ minHeight: "100vh", flexDirection: "column", display: "flex" }}
      >
        {isMobile ? (
          <Header
            onClickMenuIcon={() => {
              if (drawerOpened) {
                setDrawerOpened(false);
              } else {
                setDrawerOpened(true);
              }
            }}
            disableContentButtons
          />
        ) : (
          <Header disableMenuIcon />
        )}

        <Stack direction={"column"} sx={{ pt: pt, px: p, pb: p }} spacing={p}>
          <Paper sx={{ p: p }}>{props.mainContent}</Paper>
          {props.subContents?.map((subContent, idx) => {
            return (
              <Paper key={idx} sx={{ p: p }}>
                {subContent}
              </Paper>
            );
          })}
        </Stack>
        {isMobile ? (
          <Drawer
            open={drawerOpened}
            anchor={"right"}
            onClose={() => {
              setDrawerOpened(false);
            }}
            PaperProps={{
              sx: {
                width: "312px",
                p: p,
                backgroundColor: "background.default",
              },
            }}
          >
            <Paper sx={{ p: p, mb: 1 }}>
              <MenuOnDrawer />
            </Paper>
          </Drawer>
        ) : null}
        <Footer />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{ minHeight: "100vh", flexDirection: "column", display: "flex" }}
      >
        <Header disableMenuIcon />
        <Container maxWidth={"desktop"} sx={{ pt: pt, px: p, pb: p }}>
          {props.subContents ? (
            <Stack direction={"row"} spacing={p} alignItems={"flex-start"}>
              <Paper sx={{ p: p, width: "70%" }}>{props.mainContent}</Paper>
              <Stack direction={"column"} spacing={p} sx={{ width: "30%" }}>
                {props.subContents?.map((subContent, idx) => {
                  return (
                    <Paper key={idx} sx={{ p: p }}>
                      {subContent}
                    </Paper>
                  );
                })}
              </Stack>
            </Stack>
          ) : (
            <Paper sx={{ p: p, width: "100%" }}>{props.mainContent}</Paper>
          )}
        </Container>
        <Footer />
      </Box>
    );
  }
};
