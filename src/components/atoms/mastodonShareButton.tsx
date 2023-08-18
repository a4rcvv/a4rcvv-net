import { faMastodon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";

export type MastodonShareButtonProps = {
  url?: string;
  text?: string;
  iconButtonProps?: Omit<React.ComponentProps<typeof IconButton>, "onClick">;
  fontAwesomeIconProps?: Omit<
    React.ComponentProps<typeof FontAwesomeIcon>,
    "icon"
  >;
};

export const MastodonShareButton = (props: MastodonShareButtonProps) => {
  const intentUrl = new URL("https://donshare.net/share.html");
  if (props.text !== undefined) intentUrl.searchParams.set("text", props.text);
  if (props.url !== undefined) intentUrl.searchParams.set("url", props.url);
  return (
    <IconButton
      {...props.iconButtonProps}
      onClick={() => window.open(intentUrl, "_blank", "noreferrer")}
    >
      <FontAwesomeIcon {...props.fontAwesomeIconProps} icon={faMastodon} />
    </IconButton>
  );
};
