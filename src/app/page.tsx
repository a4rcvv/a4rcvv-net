import Home from "@/app/Home";
import { generateMyMetadata } from "@/lib/metadata";

export const generateMetadata = () => {
  return generateMyMetadata(undefined, undefined, undefined, undefined);
};

const Page = () => {
  return <Home />;
};

export default Page;
