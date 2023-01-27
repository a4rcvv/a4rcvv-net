import React from "react";
import { TwitterShareButton } from "@/components/atoms/twitterShareButton";
import { Box, Typography } from "@mui/material";

export type ShareButtonsProps = {
  url?: string;
  text?: string;
  twitterProps: Omit<
    React.ComponentProps<typeof TwitterShareButton>,
    "url" | "text"
  >;
};

export const ShareButtons = (props: ShareButtonsProps) => {
  return (
    <Box sx={{ pt: 1 }}>
      <Typography variant={"h5"}>Shared on:</Typography>
      <Box sx={{ display: "flex" }}>
        <TwitterShareButton
          {...props.twitterProps}
          url={props.url}
          text={props.text}
        />
      </Box>
    </Box>
  );
};
