import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { CodeBlock } from './code-block';

/* ------------------------------------------------------------------ */
/*  Helper to generate heading ID from text                            */
/* ------------------------------------------------------------------ */
function toId(children: React.ReactNode): string | undefined {
  if (typeof children === 'string') {
    return children
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  return undefined;
}

/* ------------------------------------------------------------------ */
/*  MDX component map (server-compatible)                              */
/* ------------------------------------------------------------------ */
export const mdxComponents: Record<string, React.ComponentType<any>> = {
  /* --- Headings --------------------------------------------------- */
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = toId(children);
    return (
      <h1 id={id} className="mt-12 mb-4 scroll-mt-24 text-4xl font-bold tracking-tight text-gray-900" {...props}>
        {children}
      </h1>
    );
  },

  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = toId(children);
    return (
      <h2
        id={id}
        className="group mt-10 mb-4 scroll-mt-24 border-b border-gray-200 pb-2 text-2xl font-semibold tracking-tight text-gray-900"
        {...props}
      >
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 text-gray-300 no-underline opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Link to ${typeof children === 'string' ? children : 'heading'}`}
          >
            #
          </a>
        )}
      </h2>
    );
  },

  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = toId(children);
    return (
      <h3
        id={id}
        className="group mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight text-gray-900"
        {...props}
      >
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 text-gray-300 no-underline opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Link to ${typeof children === 'string' ? children : 'heading'}`}
          >
            #
          </a>
        )}
      </h3>
    );
  },

  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = toId(children);
    return (
      <h4 id={id} className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold text-gray-900" {...props}>
        {children}
      </h4>
    );
  },

  /* --- Paragraph -------------------------------------------------- */
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-7 text-gray-700 [&:not(:first-child)]:mt-4" {...props}>
      {children}
    </p>
  ),

  /* --- Links ------------------------------------------------------ */
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-500"
          {...props}
        >
          {children}
          <ExternalLink className="ml-0.5 inline h-3.5 w-3.5" />
        </a>
      );
    }
    return (
      <Link
        href={href || '#'}
        className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-500"
        {...props}
      >
        {children}
      </Link>
    );
  },

  /* --- Lists ------------------------------------------------------ */
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-gray-700 marker:text-gray-400" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-gray-700 marker:font-medium marker:text-gray-500" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1 leading-7" {...props}>
      {children}
    </li>
  ),

  /* --- Blockquote ------------------------------------------------- */
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-blue-500 bg-blue-50/50 py-1 pl-5 pr-4 italic text-gray-700 [&>p]:my-2"
      {...props}
    >
      {children}
    </blockquote>
  ),

  /* --- Code ------------------------------------------------------- */
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code (no className = not a code block child)
    if (!className) {
      return (
        <code
          className="rounded-md border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-mono text-sm font-medium text-gray-800"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Code block rendered inside <pre>
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },

  // Interactive pre block with copy button (client component)
  pre: CodeBlock,

  /* --- Images ----------------------------------------------------- */
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-gray-200">
        {/* biome-ignore lint/a11y/useAltText: alt is passed through props */}
        <img src={src} alt={alt || ''} className="w-full object-cover" loading="lazy" {...props} />
      </div>
      {alt && <figcaption className="mt-3 text-center text-sm text-gray-500">{alt}</figcaption>}
    </figure>
  ),

  /* --- Table ------------------------------------------------------ */
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600"
      {...props}
    >
      {children}
    </thead>
  ),

  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 font-semibold" {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-t border-gray-100 px-4 py-3 text-gray-700" {...props}>
      {children}
    </td>
  ),

  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="transition-colors hover:bg-gray-50/50" {...props}>
      {children}
    </tr>
  ),

  /* --- Horizontal rule -------------------------------------------- */
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="my-8 border-gray-200" {...props} />,

  /* --- Strong / Em ------------------------------------------------ */
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),

  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-gray-700" {...props}>
      {children}
    </em>
  ),
};
