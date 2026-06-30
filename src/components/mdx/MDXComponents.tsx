import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { ImageFigure } from "./ImageFigure";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-display mt-12 text-4xl font-semibold tracking-tight text-foreground first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display mt-12 mb-4 text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 text-xl font-semibold text-foreground"
      {...props}
    />
  ),
  p: (props) => (
    <p className="my-5 leading-8 text-muted" {...props} />
  ),
  ul: (props) => (
    <ul className="my-5 list-disc space-y-2 ps-6 text-muted" {...props} />
  ),
  ol: (props) => (
    <ol className="my-5 list-decimal space-y-2 ps-6 text-muted" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-8 border-s-4 border-accent/40 ps-5 italic text-muted"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border-subtle">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-border-subtle bg-accent-soft px-4 py-3 font-semibold text-foreground"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-border-subtle px-4 py-3 text-muted"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
      {...props}
    />
  ),
  pre: CodeBlock,
  img: (props) => (
    <Image
      src={props.src ?? ""}
      alt={props.alt ?? ""}
      width={800}
      height={450}
      className="my-8 rounded-2xl border border-border-subtle"
    />
  ),
  Callout,
  ImageFigure,
};
