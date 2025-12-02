
export const getCleanDataForRenderer = (data: Record<string, unknown>): Record<string, unknown> => {
  const cleanData: Record<string, unknown> = {};

  Object.keys(data).forEach((key) => {
    const section = data[key];

    // Skip suggestedUpdates and other metadata
    if (key === 'suggestedUpdates' || key === 'templateId') {
      return;
    }

    if (section && typeof section === 'object') {
      const sectionData = { ...(section as Record<string, unknown>) };

     

      if (Array.isArray(sectionData.items)) {
        sectionData.items = sectionData.items.map((item) => {
          if (typeof item === 'object' && item !== null) {
            const cleanItem = { ...item } as Record<string, unknown>;

         
            return cleanItem;
          }
          return item;
        });
      }

      cleanData[key] = sectionData;
    } else {
      cleanData[key] = section;
    }
  });

  return cleanData;
};

/**
 * Removes HTML span tags with error highlighting styles from a string
 *
 * @param value - The string potentially containing error highlighting HTML
 * @returns The cleaned string without span tags
 */
const removeErrorHighlighting = (value: string): string => {
  let cleanValue = value;

  // Remove spans with style attribute
  cleanValue = cleanValue.replace(/<span[^>]*\sstyle\s*=\s*[^>]*>(.*?)<\/span>/gi, '$1');

  // Remove any remaining spans with text-decoration in inline style
  cleanValue = cleanValue.replace(/<span[^>]*text-decoration[^>]*>(.*?)<\/span>/gi, '$1');

  return cleanValue;
};


