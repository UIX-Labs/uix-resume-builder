/**
 * Paginates a column element by height: splits content into pages that fit within maxHeight.
 * Respects data-canbreak and data-has-breakable-content for section breaks.
 * Returns an array of pages, each page an array of top-level DOM nodes (HTMLElement).
 *
 * @param contentWidthPx - When set, use this width for measurement so pagination matches
 *   the real content area (A4 width 794 - 2*padding). Prevents wrong width on hidden measure column.
 */
export function paginateColumn(
  columnEl: HTMLElement,
  firstPageMaxHeight: number,
  otherPageMaxHeight: number,
  contentWidthPx?: number,
): HTMLElement[][] {
  const outPages: HTMLElement[][] = [];

  const testContainer = document.createElement('div');
  testContainer.style.cssText = 'position:absolute;visibility:hidden;left:-9999px;top:0;';
  const cs = getComputedStyle(columnEl);
  testContainer.style.width = contentWidthPx != null && contentWidthPx > 0 ? `${contentWidthPx}px` : cs.width;
  testContainer.style.fontFamily = cs.fontFamily;
  testContainer.style.fontSize = cs.fontSize;
  testContainer.style.lineHeight = cs.lineHeight;
  testContainer.style.letterSpacing = cs.letterSpacing;
  testContainer.style.wordSpacing = cs.wordSpacing;
  testContainer.className = columnEl.className;
  document.body.appendChild(testContainer);

  let currentPageIndex = 0;
  outPages.push([]);
  const containerStack: HTMLElement[] = [];

  const getMax = () => (currentPageIndex === 0 ? firstPageMaxHeight : otherPageMaxHeight);

  function getPageHeight(): number {
    testContainer.innerHTML = '';
    const nodes = outPages[currentPageIndex];
    nodes.forEach((node) => {
      if (node.nodeType) testContainer.appendChild(node.cloneNode(true));
    });
    return testContainer.getBoundingClientRect().height;
  }

  function startNewPage(): void {
    currentPageIndex++;
    outPages.push([]);
    for (let i = 0; i < containerStack.length; i++) {
      const orig = containerStack[i];
      const clone = orig.cloneNode(false) as HTMLElement;
      if (i === 0) {
        outPages[currentPageIndex].push(clone);
      } else {
        const parent = containerStack[i - 1];
        if (parent) parent.appendChild(clone);
      }
      containerStack[i] = clone;
    }
  }

  function getCurrentContainer(): HTMLElement | null {
    return containerStack.length > 0 ? containerStack[containerStack.length - 1] : null;
  }

  function addToPage(el: HTMLElement): void {
    const c = getCurrentContainer();
    if (c) c.appendChild(el);
    else outPages[currentPageIndex].push(el);
  }

  function processChildren(parent: HTMLElement): void {
    const children = Array.from(parent.children) as HTMLElement[];
    for (const child of children) {
      const tag = child.tagName?.toLowerCase();
      const breakable = ['ul', 'ol', 'p', 'div'].includes(tag);
      const canBreak = child.getAttribute('data-canbreak') === 'true' || breakable;
      const hasBreakable =
        child.querySelector('[data-canbreak="true"]') != null ||
        child.getAttribute('data-has-breakable-content') === 'true';

      const clone = child.cloneNode(true) as HTMLElement;
      addToPage(clone);
      if (getPageHeight() <= getMax()) continue;

      const c = getCurrentContainer();
      if (c?.contains(clone)) c.removeChild(clone);
      else outPages[currentPageIndex].pop();

      if ((canBreak || hasBreakable) && child.children.length > 0) {
        const wrapper = child.cloneNode(false) as HTMLElement;
        wrapper.classList.remove('border-b', 'border-t', 'border-l', 'border-r', 'border');
        addToPage(wrapper);
        containerStack.push(wrapper);
        processChildren(child);
        containerStack.pop();
        continue;
      }

      if (getPageHeight() <= 10) {
        addToPage(clone);
        continue;
      }

      startNewPage();
      const newClone = child.cloneNode(true) as HTMLElement;
      addToPage(newClone);
      if (getPageHeight() <= getMax()) continue;

      const c2 = getCurrentContainer();
      if (c2?.contains(newClone)) c2.removeChild(newClone);
      else outPages[currentPageIndex].pop();

      if ((canBreak || hasBreakable) && child.children.length > 0) {
        const wrapper = child.cloneNode(false) as HTMLElement;
        wrapper.classList.remove('border-b', 'border-t', 'border-l', 'border-r', 'border');
        addToPage(wrapper);
        containerStack.push(wrapper);
        processChildren(child);
        containerStack.pop();
      }
    }
  }

  processChildren(columnEl);
  document.body.removeChild(testContainer);
  return outPages;
}
