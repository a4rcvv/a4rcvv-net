import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { IconButton } from "@mui/material";
import React from "react";

export type TwitterShareButtonProps = {
  url?: string;
  text?: string;
  via?: string;
  hashtags?: string[];
  related?: string[];
  iconButtonProps?: Omit<React.ComponentProps<typeof IconButton>, "onClick">;
  fontAwesomeIconProps?: Omit<
    React.ComponentProps<typeof FontAwesomeIcon>,
    "icon"
  >;
};

export const TwitterShareButton = (props: TwitterShareButtonProps) => {
  const intentUrl = new URL("https://twitter.com/intent/tweet");
  if (props.text !== undefined) intentUrl.searchParams.set("text", props.text);
  if (props.url !== undefined) intentUrl.searchParams.set("url", props.url);
  if (props.via !== undefined) intentUrl.searchParams.set("via", props.via);
  if (props.hashtags !== undefined)
    intentUrl.searchParams.set("hashtags", props.hashtags.join(","));
  if (props.related !== undefined)
    intentUrl.searchParams.set("related", props.related.join(","));
  return (
    <IconButton
      {...props.iconButtonProps}
      onClick={() => window.open(intentUrl, "_blank", "noreferrer")}
    >
      <FontAwesomeIcon {...props.fontAwesomeIconProps} icon={faTwitter} />
    </IconButton>
  );
};
