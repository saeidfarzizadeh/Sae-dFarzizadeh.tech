type CodeBlockProps = React.HTMLAttributes<HTMLPreElement>;

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  return (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-2xl border border-border-subtle bg-[#0d0c0b] p-5 text-sm leading-relaxed text-[#e8e4df] shadow-[var(--shadow-soft)]"
    >
      {children}
    </pre>
  );
}
