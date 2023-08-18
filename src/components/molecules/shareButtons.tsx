import { MastodonShareButton } from "@/components/atoms/mastodonShareButton";
import { MisskeyShareButton } from "@/components/atoms/misskeyShareButton";
import { TwitterShareButton } from "@/components/atoms/twitterShareButton";
import { Box, Typography } from "@mui/material";
import React from "react";

export type ShareButtonsProps = {
  url?: string;
  text?: string;
  twitterProps: Omit<
    React.ComponentProps<typeof TwitterShareButton>,
    "url" | "text"
  >;
  mastodonProps: Omit<
    React.ComponentProps<typeof MastodonShareButton>,
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
        <MastodonShareButton
          {...props.mastodonProps}
          url={props.url}
          text={props.text}
        />
        <MisskeyShareButton url={props.url} text={props.text} />
      </Box>
    </Box>
  );
};
