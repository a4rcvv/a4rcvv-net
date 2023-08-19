import Link from "@/lib/link";
import { Box, Divider, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import NextImage from "next/image";
import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import {
  CodeComponent,
  HeadingComponent,
} from "react-markdown/lib/ast-to-react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";

export const ReactMdCodeBlock: CodeComponent = (props) => {
  if (props.inline) {
    return (
      <code className="rounded bg-zinc-200 py-1 px-1 mx-1 text-red-600 dark:bg-zinc-600 dark:text-zinc-300">
        {props.children}
      </code>
    );
  }
  const match = /language-(\w+)/.exec(props.className || "");
  const lang = match && match[1] ? match[1] : "";
  return (
    <SyntaxHighlighter style={oneDark} language={lang}>
      {String(props.children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};
export const ReactMdHeading: HeadingComponent = (props) => {
  const [variant, mt, includeDivider]: [Variant, number, boolean] = (() => {
    switch (props.level) {
      case 1:
        return ["h1", 6, false];
      case 2:
        return ["h2", 5, true];
      case 3:
        return ["h3", 4, false];
      case 4:
        return ["h4", 3, false];
      case 5:
        return ["h5", 2, false];
      case 6:
        return ["h6", 2, false];
      default:
        throw Error("Unknown level");
    }
  })();
  return (
    <div>
      <Typography variant={variant} sx={{ mb: 2, mt: mt }} fontWeight={"bold"}>
        {props.children}
      </Typography>
      {includeDivider && <Divider />}
    </div>
  );
};

export const ReactMdParagraph = (props: { children: ReactNode }) => {
  return (
    <Typography variant={"body1"} sx={{ mt: 2 }} fontWeight={"medium"}>
      {props.children}
    </Typography>
  );
};

export const ReactMdLink = (
  props: { href?: string; children: ReactNode } & object,
) => {
  const { href, children } = props;
  if (href?.match("http")) {
    return (
      <Link href={href} target={"_blank"} color="primary.dark">
        {children}
      </Link>
    );
  }
  return (
    <Link href={href ?? ""} color="primary.dark">
      {children}
    </Link>
  );
};

export type ReactMdImageProps = {
  src?: string;
  alt?: string;
};

export const ReactMdImage = (props: ReactMdImageProps) => {
  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: "32vh",
      }}
    >
      <Link href={props.src ?? ""}>
        <NextImage
          src={props.src ?? ""}
          alt={props.alt ?? ""}
          fill
          style={{ objectFit: "contain", objectPosition: "left center" }}
        />
      </Link>
    </Box>
  );
};

export type MaterialReactMarkdownProps = {
  markdownString?: string;
};

export const MaterialReactMarkdown = (props: MaterialReactMarkdownProps) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath, remarkUnwrapImages]}
      components={{
        code: ReactMdCodeBlock,
        h1: ReactMdHeading,
        h2: ReactMdHeading,
        h3: ReactMdHeading,
        h4: ReactMdHeading,
        h5: ReactMdHeading,
        h6: ReactMdHeading,
        a: ReactMdLink,
        img: ReactMdImage,
        p: ReactMdParagraph,
      }}
    >
      {props.markdownString ?? ""}
    </ReactMarkdown>
  );
};
