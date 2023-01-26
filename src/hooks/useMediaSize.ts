import { useMediaQuery, useTheme } from "@mui/material";

const useMediaSize = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(() => theme.breakpoints.only("desktop"));
  const isLaptop = useMediaQuery(() => theme.breakpoints.only("laptop"));
  const isTablet = useMediaQuery(() => theme.breakpoints.only("tablet"));
  if (isDesktop) {
    return "desktop";
  }
  if (isLaptop) {
    return "laptop";
  }
  if (isTablet) {
    return "tablet";
  }
  return "mobile";
};

export default useMediaSize;
