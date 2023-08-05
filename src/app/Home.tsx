"use client";

import { MainTemplate } from "@/components/templates/mainTemplate";
import { menuElements } from "@/constants";
// import { MyHead } from "@/lib/MyHead";
import { getPageTitle } from "@/lib/getPageTitle";
import { NextLinkComposed } from "@/lib/link";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const mainContent = () => {
    return (
      <Box>
        <Typography variant={"h1"}>a4rcvv.net</Typography>
        <Stack direction={"column"} spacing={1} sx={{ mt: 1 }}>
          {menuElements.map((element) => {
            return (
              <Card variant={"outlined"} key={element.href}>
                <CardActionArea
                  component={NextLinkComposed}
                  to={{ pathname: element.href }}
                >
                  <CardHeader title={element.name} />
                  <CardContent>
                    <Typography>{element.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Stack>
      </Box>
    );
  };
  return (
    <div>
      {/* <MyHead title={getPageTitle()} /> */}
      <MainTemplate mainContent={mainContent()} />
    </div>
  );
};

export default Home;
