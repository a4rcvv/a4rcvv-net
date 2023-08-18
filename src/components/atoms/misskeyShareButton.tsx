import { Button } from "@mui/material";

export type MisskeyShareButtonProps = {
  url?: string;
  text?: string;
};

export const MisskeyShareButton = (props: MisskeyShareButtonProps) => {
  const intentUrl = new URL("https://misskeyshare.link/share.html");
  if (props.text !== undefined) intentUrl.searchParams.set("text", props.text);
  if (props.url !== undefined) intentUrl.searchParams.set("url", props.url);
  return (
    <Button
      variant="contained"
      size="small"
      disableElevation
      onClick={() => window.open(intentUrl, "_blank", "noreferrer")}
      sx={{
        textTransform: "none",
        backgroundColor: "#98C832",
        borderColor: "#98C832",
        ":hover": {
          backgroundColor: "#789B26",
          borderColor: "#789B26",
          boxShadow: "none",
        },
      }}
    >
      Misskey
    </Button>
  );
};
