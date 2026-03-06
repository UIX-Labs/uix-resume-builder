// ---------------------------------------------------------------------------
// Pure DOM helper functions for pagination
// ---------------------------------------------------------------------------

/**
 * Returns true if the element contains only text content (no child elements).
 */
export function isTextOnlyElement(el: HTMLElement): boolean {
  if (el.children.length > 0) return false;
  const text = el.textContent ?? '';
  return text.trim().length > 0;
}

/**
 * Attempts to split a text-only element into multiple smaller blocks by
 * paragraph breaks (`\n\n`), line breaks (`\n`), or `<br><br>`. Returns
 * a wrapper element containing sub-divs, or `null` if splitting is not
 * possible.
 */
export function splitTextBlock(el: HTMLElement): HTMLElement | null {
  const html = el.innerHTML;
  if (!html) return null;

  let parts = html.split(/\n\n+/);
  if (parts.length <= 1) parts = html.split(/\n/);
  if (parts.length <= 1) parts = html.split(/<br\s*\/?>\s*<br\s*\/?>/i);
  if (parts.length <= 1) return null;

  const nonEmptyParts = parts.filter((p) => p.trim().length > 0);
  if (nonEmptyParts.length <= 1) return null;

  const wrapper = el.cloneNode(false) as HTMLElement;
  for (const part of nonEmptyParts) {
    const partDiv = document.createElement('div');
    partDiv.innerHTML = part;
    wrapper.appendChild(partDiv);
  }

  return wrapper;
}

/**
 * Removes common Tailwind border classes from an element so that
 * continuation wrappers on the next page don't show duplicate borders.
 */
export function removeBorderClasses(el: HTMLElement): void {
  if (!el.classList) return;
  el.classList.remove('border-b', 'border-t', 'border-l', 'border-r', 'border');
}
