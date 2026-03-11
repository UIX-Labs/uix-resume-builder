export function decodeHtmlEntities(text: string): string {
  if (!text) return '';

  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Converts markdown text to HTML
 * Handles: **bold**, *italic*, bullet lists, ordered lists, line breaks
 */
export function convertMarkdownToHtml(text: string): string {
  if (!text) return '';

  // Escape HTML entities first
  let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

export function normalizeMarkdownContent(content: string | undefined | null): string {
  if (!content) return '';

  const trimmed = content.trim();
  if (isHtml(trimmed)) return trimmed;

  const lines = content.split(/\r?\n/);
  const result: string[] = [];
  let currentListType: 'bullet' | 'ordered' | null = null;

  // Helper function to close any open list
  const closeList = () => {
    if (currentListType === 'bullet') {
      result.push('</ul>');
    } else if (currentListType === 'ordered') {
      result.push('</ol>');
    }
    currentListType = null;
  };

  // Helper function to open a list if needed
  const openList = (type: 'bullet' | 'ordered') => {
    if (currentListType !== type) {
      closeList();
      result.push(type === 'bullet' ? '<ul>' : '<ol>');
      currentListType = type;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    const orderedMatch = line.match(/^\d+[.)]\s+(.*)$/);
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);

    if (headerMatch) {
      closeList();
      const level = headerMatch[1].length;
      const text = convertMarkdownToHtml(headerMatch[2]);
      result.push(`<h${level}>${text}</h${level}>`);
    } else if (bulletMatch) {
      openList('bullet');
      const markdownContent = convertMarkdownToHtml(bulletMatch[1]);
      result.push(`<li><p>${markdownContent}</p></li>`);
    } else if (orderedMatch) {
      openList('ordered');
      const markdownContent = convertMarkdownToHtml(orderedMatch[1]);
      result.push(`<li><p>${markdownContent}</p></li>`);
    } else {
      closeList();
      if (line) {
        const convertedText = convertMarkdownToHtml(line);
        result.push(lines.length === 1 ? convertedText : `<span>${convertedText}</span>`);
      } else {
        result.push('<p><br /></p>');
      }
    }
  }

  closeList();

  return result.join('');
}
