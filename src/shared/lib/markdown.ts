/**
 * Converts markdown text to HTML
 * Handles: **bold**, *italic*, bullet lists, ordered lists, line breaks
 */
export function convertMarkdownToHtml(text: string): string {
  if (!text) return "";

  // Escape HTML entities first
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Convert **bold** or __bold__ to <strong> (process before italic to avoid conflicts)
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Convert *italic* or _italic_ to <em> (only if not already part of bold)
  // Match single asterisk/underscore that's not part of double asterisk/underscore
  html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, "<em>$1</em>");
  html = html.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, "<em>$1</em>");

  return html;
}

/**
 * Checks if a string contains HTML tags
 */
export function isHtml(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(content.trim());
}

/**
 * Normalizes content by converting markdown to HTML if needed
 * If content is already HTML, returns as-is
 * If content is markdown, converts to HTML
 */
export function normalizeMarkdownContent(content: string | undefined | null): string {
  if (!content) {
    return "";
  }

  const trimmed = content.trim();
  
  // If already HTML, return as-is
  if (isHtml(trimmed)) {
    return content;
  }

  // Convert markdown to HTML
  return convertMarkdownToHtml(content);
}

