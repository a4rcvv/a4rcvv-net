import useMediaSize from "@/hooks/useMediaSize";

const useResponsiveValue = <T>(mobile: T, tablet: T, laptop: T, desktop: T) => {
  const mediaSize = useMediaSize();
  if (mediaSize == "desktop") {
    return desktop;
  }
  if (mediaSize == "laptop") {
    return laptop;
  }
  if (mediaSize == "tablet") {
    return tablet;
  }
  return mobile;
};

export default useResponsiveValue;
