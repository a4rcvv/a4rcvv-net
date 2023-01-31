import { description } from "rehype-parse/lib/errors";

export type MenuElement = {
  name: string;
  href: string;
  description?: string;
};

export const menuElements: MenuElement[] = [
  {
    name: "About",
    href: "/blog/entry/about",
    description: "当ウェブサイトと管理者の情報",
  },
  { name: "Blog", href: "/blog", description: "ブログ" },
  { name: "Contact", href: "/blog/entry/contact", description: "連絡先" },
];
