export const pageView = (url: string) => {
  if (typeof window !== "undefined") {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};
