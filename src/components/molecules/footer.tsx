import { Typography, Paper, Stack, IconButton, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMastodon,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Link from "@/lib/link";

export const Footer = () => {
  const theme = useTheme();
  const primaryContrast = theme.palette.primary.contrastText;
  return (
    <Paper
      square
      variant={"outlined"}
      component={"footer"}
      sx={{
        width: "100%",
        marginTop: "auto",
        backgroundColor: "primary.dark",
        py: 1,
      }}
    >
      <Link href={{ pathname: "/" }}>
        <Typography
          variant="h6"
          align={"center"}
          color={"primary.contrastText"}
        >
          a4rcvv.net
        </Typography>
      </Link>
      <Stack direction={"row"} justifyContent={"center"}>
        <IconButton
          size={"medium"}
          onClick={() =>
            window.open(
              "https://fedibird.com/web/accounts/109561667767711890/about",
              "_blank",
            )
          }
        >
          <FontAwesomeIcon icon={faMastodon} color={primaryContrast} />
        </IconButton>
        <IconButton
          size={"medium"}
          onClick={() => window.open("https://twitter.com/a4rcvv", "_blank")}
        >
          <FontAwesomeIcon icon={faTwitter} color={primaryContrast} />
        </IconButton>
        <IconButton
          size={"medium"}
          onClick={() => window.open("https://github.com/a4rcvv", "_blank")}
        >
          <FontAwesomeIcon icon={faGithub} color={primaryContrast} />
        </IconButton>
      </Stack>
      <Typography align={"center"} color={"secondary.contrastText"}>
        © {dayjs().year()} Arc
      </Typography>
    </Paper>
  );
};
