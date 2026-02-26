/**
 * Converts markdown text to HTML
 * Handles: **bold**, *italic*,
 * bullet lists, ordered lists, links, inline code, code blocks, blockquotes,
 * horizontal rules, strikethrough
 */
export function convertMarkdownToHtml(text: string): string {
  if (!text) return '';

  const html = text;

  const lines = html.split('\n');
  const nonEmptyLines = lines.filter((line) => line.trim() !== '');

  if (nonEmptyLines.length === 1) {
    const line = nonEmptyLines[0].trim();
    const hasBlockMarkdown =
      line.match(/^#{1,6}\s/) || // headings
      line.match(/^[-*+]\s/) || // unordered list
      line.match(/^\d+\.\s/) || // ordered list
      line.match(/^>\s/) || // blockquote
      line.match(/^```/) || // code block
      line.match(/^([-*_])\1{2,}$/); // horizontal rule

    if (!hasBlockMarkdown) {
      return processInlineMarkdown(line);
    }
  }

  // Multi-line or has block-level markdown - process normally
  const processedLines: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let inList = false;
  let listType = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        processedLines.push(`<pre><code>${codeBlockContent.join('\n')}</code></pre>`);
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
      continue;
    }

    if (inList && !line.trim().match(/^[-*+]\s|^\d+\.\s/)) {
      processedLines.push(listType === 'ul' ? '</ul>' : '</ol>');
      inList = false;
      listType = '';
    }

    // Handle headings (# ## ### etc.)
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const content = headingMatch[2];
      processedLines.push(`<p><strong>${processInlineMarkdown(content)}</strong></p>`);
      continue;
    }

    // Handle horizontal rules (--- or ***)
    if (line.trim().match(/^([-*_])\1{2,}$/)) {
      processedLines.push('<hr>');
      continue;
    }

    // Handle unordered lists
    const unorderedListMatch = line.match(/^([-*+])\s+(.+)$/);
    if (unorderedListMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) {
          processedLines.push('</ol>');
        }
        processedLines.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      processedLines.push(`<li>${processInlineMarkdown(unorderedListMatch[2])}</li>`);
      continue;
    }

    // Handle ordered lists
    const orderedListMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedListMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) {
          processedLines.push('</ul>');
        }
        processedLines.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      processedLines.push(`<li>${processInlineMarkdown(orderedListMatch[1])}</li>`);
      continue;
    }

    // Handle blockquotes
    const blockquoteMatch = line.match(/^>\s+(.+)$/);
    if (blockquoteMatch) {
      processedLines.push(`<blockquote>${processInlineMarkdown(blockquoteMatch[1])}</blockquote>`);
      continue;
    }

    // Handle empty lines
    if (line.trim() === '') {
      processedLines.push('<br>');
      continue;
    }

    // Regular paragraph
    processedLines.push(`<p>${processInlineMarkdown(line)}</p>`);
  }

  // Close any remaining open lists
  if (inList) {
    processedLines.push(listType === 'ul' ? '</ul>' : '</ol>');
  }

  // Close any remaining code blocks
  if (inCodeBlock) {
    processedLines.push(`<pre><code>${codeBlockContent.join('\n')}</code></pre>`);
  }

  return processedLines.join('');
}

/**
 * Process inline markdown elements (bold, italic, code, links, etc.)
 * This is applied to text within block elements
 */
function processInlineMarkdown(text: string): string {
  if (!text) return '';

  let html = text;

  html = html
    .replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Convert inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert ~~strikethrough~~
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Convert **bold** or __bold__ to <strong> (process before italic to avoid conflicts)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Convert *italic* or _italic_ to <em> (only if not already part of bold)
  // Match single asterisk/underscore that's not part of double asterisk/underscore
  html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>');
  html = html.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, '<em>$1</em>');

  return html;
}

/**
 * Checks if a string contains HTML tags
 */
export function isHtml(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(content.trim());
}

export const cleanHtml = (text: string): string => text.replace(/<[^>]*>/g, '').trim();

export function stripMarkdown(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // Remove links [text](url) → text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove bold **text** or __text__ → text
  cleaned = cleaned.replace(/\*\*(.+?)\*\*/g, '$1');
  cleaned = cleaned.replace(/__(.+?)__/g, '$1');

  // Remove italic *text* or _text_ → text
  cleaned = cleaned.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '$1');
  cleaned = cleaned.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, '$1');

  // Remove strikethrough ~~text~~ → text
  cleaned = cleaned.replace(/~~(.+?)~~/g, '$1');

  // Remove inline code `code` → code
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

  // Remove headings # text → text
  cleaned = cleaned.replace(/^#{1,6}\s+(.+)$/gm, '$1');

  // Remove blockquotes > text → text
  cleaned = cleaned.replace(/^>\s+(.+)$/gm, '$1');

  // Remove list markers (- * + or 1. 2. etc)
  cleaned = cleaned.replace(/^[-*+]\s+/gm, '');
  cleaned = cleaned.replace(/^\d+\.\s+/gm, '');

  // Remove horizontal rules
  cleaned = cleaned.replace(/^([-*_])\1{2,}$/gm, '');

  return cleaned.trim();
}

/**
 * Normalizes content by converting markdown to HTML if needed
 * If content is already HTML, returns as-is
 * If content is markdown, converts to HTML
 */
export function normalizeMarkdownContent(content: string | undefined | null): string {
  if (!content) {
    return '';
  }

  const trimmed = content.trim();

  // If already HTML, return as-is
  if (isHtml(trimmed)) {
    return content;
  }

  // Convert markdown to HTML
  return convertMarkdownToHtml(content);
}
