import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { ImageFigure } from "./ImageFigure";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-display mt-12 text-4xl font-semibold tracking-tight text-neutral-900 first:mt-0 dark:text-neutral-50"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display mt-12 mb-4 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-50"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-5 leading-8 text-neutral-700 dark:text-neutral-300"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="my-5 list-disc space-y-2 pl-6 text-neutral-700 dark:text-neutral-300"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-5 list-decimal space-y-2 pl-6 text-neutral-700 dark:text-neutral-300"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-4 border-neutral-300 pl-5 italic text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:decoration-neutral-100"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto">
      <table
        className="w-full border-collapse text-left text-sm"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-neutral-200 px-4 py-3 font-semibold dark:border-neutral-800"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-neutral-100 px-4 py-3 dark:border-neutral-900"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.9em] text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
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
      className="my-8 rounded-2xl border border-neutral-200 dark:border-neutral-800"
    />
  ),
  Callout,
  ImageFigure,
};
