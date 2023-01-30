import { ArticleMetadata } from "@/lib/types";
import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React from "react";
import { NextLinkComposed } from "@/lib/link";

export type ArticleNavigationProps = {
  nextMetadata?: ArticleMetadata;
  previousMetadata?: ArticleMetadata;
  style: "horizontal" | "vertical";
};

type NavigationPaperProps = {
  id: string;
  title?: string;
  arrow: "left" | "right";
};

const NavigationCard = (props: NavigationPaperProps) => {
  const inPaper = (props: NavigationPaperProps) => {
    switch (props.arrow) {
      case "left":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              p: 1,
            }}
          >
            <ArrowLeft fontSize={"large"} />
            <Typography variant={"h5"}>{props.title}</Typography>
          </Box>
        );
      case "right":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              p: 1,
            }}
          >
            <ArrowRight fontSize={"large"} />
            <Typography variant={"h5"}>{props.title}</Typography>
          </Box>
        );
    }
  };
  return (
    <Card variant="outlined">
      <CardActionArea
        component={NextLinkComposed}
        to={{ pathname: `/blog/entry/${props.id}` }}
      >
        {inPaper(props)}
      </CardActionArea>
    </Card>
  );
};

export const ArticleNavigation = (props: ArticleNavigationProps) => {
  const stackDirection = (() => {
    switch (props.style) {
      case "horizontal":
        return "row";
      case "vertical":
        return "column";
    }
  })();
  return (
    <Box>
      <Stack direction={stackDirection} spacing={1}>
        {props.nextMetadata ? (
          <NavigationCard
            arrow={"left"}
            title={props.nextMetadata.title}
            id={props.nextMetadata.id}
          />
        ) : null}
        {props.previousMetadata ? (
          <NavigationCard
            arrow={"right"}
            title={props.previousMetadata.title}
            id={props.previousMetadata.id}
          />
        ) : null}
      </Stack>
    </Box>
  );
};
