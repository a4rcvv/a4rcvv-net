import {
  CodeComponent,
  HeadingComponent,
} from "react-markdown/lib/ast-to-react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import Link from "@/lib/link";
import { ReactNode } from "react";
import NextImage from "next/future/image";
import remarkUnwrapImages from "remark-unwrap-images";

export const ReactMdCodeBlock: CodeComponent = (props) => {
  if (props.inline) {
    return <code className={props.className}>{props.children}</code>;
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
  const variant = (() => {
    switch (props.level) {
      case 1:
        return "h1";
      case 2:
        return "h2";
      case 3:
        return "h3";
      case 4:
        return "h4";
      case 5:
        return "h5";
      case 6:
        return "h6";
      default:
        throw Error("Unknown level");
    }
  })();
  return (
    <Typography variant={variant} sx={{ my: 2 }}>
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
      <Link href={href} target={"_blank"} color={"inherit"}>
        {children}
      </Link>
    );
  }
  return <Link href={href ?? ""}>{children}</Link>;
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
      }}
    >
      {props.markdownString ?? ""}
    </ReactMarkdown>
  );
};
