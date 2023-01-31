import type { NextPage } from "next";
import { MainTemplate } from "@/components/templates/mainTemplate";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { NextLinkComposed } from "@/lib/link";
import { menuElements } from "@/constants";

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
  return <MainTemplate mainContent={mainContent()} />;
};

export default Home;
