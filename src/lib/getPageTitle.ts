export const getPageTitle = (partialTitle?: string) => {
  const siteTitle = "a4rcvv.net";
  if (partialTitle === undefined) {
    return siteTitle;
  } else {
    return `${partialTitle} - ${siteTitle}`;
  }
};
