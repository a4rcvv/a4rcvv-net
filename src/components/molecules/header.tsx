import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Link, { NextLinkComposed } from "@/lib/link";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import MenuIcon from "@mui/icons-material/Menu";

export type HeaderProps = {
  onClickMenuIcon?: () => void;
  disableContentButtons?: boolean;
  disableMenuIcon?: boolean;
};

export const Header = (props: HeaderProps) => {
  const px = useResponsiveValue(2, 2, 4, 4);
  const disableContentButtons = props.disableContentButtons ?? false;
  const disableMenuIcon = props.disableMenuIcon ?? false;
  return (
    <AppBar position="fixed" sx={{ px: px }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <Link href={{ pathname: "/" }} underline="none" color={"inherit"}>
            a4rcvv.net
          </Link>
        </Typography>
        {!disableContentButtons ? (
          <Box>
            <Button
              component={NextLinkComposed}
              to={{ pathname: "/blog" }}
              color="inherit"
            >
              Blog
            </Button>
            <Button
              component={NextLinkComposed}
              to={{ pathname: "/contact" }}
              color="inherit"
            >
              Contact
            </Button>
          </Box>
        ) : null}
        {!disableMenuIcon ? (
          <IconButton color={"inherit"} onClick={props.onClickMenuIcon}>
            <MenuIcon />
          </IconButton>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
