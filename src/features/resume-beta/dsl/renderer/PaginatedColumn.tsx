// ---------------------------------------------------------------------------
// PaginatedColumn — renders paginated DOM nodes via dangerouslySetInnerHTML
// ---------------------------------------------------------------------------

import React from 'react';

interface PaginatedColumnProps {
  nodes: HTMLElement[];
  columnKey: string;
}

export function PaginatedColumn({ nodes, columnKey }: PaginatedColumnProps) {
  return (
    <>
      {nodes.map((node, i) => (
        <div
          key={`${columnKey}-${i}-${node?.getAttribute?.('data-section') ?? node?.getAttribute?.('data-item') ?? node?.tagName ?? 'node'}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for DOM node rendering
          dangerouslySetInnerHTML={{ __html: node.outerHTML }}
          style={{ display: 'block' }}
        />
      ))}
    </>
  );
}
