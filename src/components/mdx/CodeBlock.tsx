type CodeBlockProps = React.HTMLAttributes<HTMLPreElement>;

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  return (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-950 p-4 text-sm leading-relaxed text-neutral-100 dark:border-neutral-800"
    >
      {children}
    </pre>
  );
}
