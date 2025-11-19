import { useState, useEffect, useCallback } from 'react';
import { getResumeData, getResumeEmptyData, saveFormData } from '../api';

// --- Deep merge utility ---
function deepMerge<T>(target: T, source: T): T {
  if (source === null || source === undefined) return target;
  if (target === null || target === undefined) return source;

  if (Array.isArray(source)) {
    if (Array.isArray(target) && target.length > 0) {
      if (typeof source[0] === 'object' && source[0] !== null) {
        return target.map((item) => deepMerge(item, source[0])) as unknown as T;
      }
      return target as unknown as T;
    }
    return source as unknown as T;
  }

  if (typeof source === 'object' && source !== null) {
    const result: any = { ...target };
    for (const key in source) {
      result[key] = deepMerge((target as any)[key], (source as any)[key]);
    }
    return result;
  }

  return (target ?? source) as T;
}

function normalizeStringsFields(data: any): any {
  if (!data) return data;

  const stringsFields = ['interests', 'achievements'];

  for (const field of stringsFields) {
    if (data[field] && data[field].items) {
      if (Array.isArray(data[field].items) && data[field].items.length > 0) {
        const firstItem = data[field].items[0];
        if (typeof firstItem === 'string') {
          data[field].items = [
            { itemId: crypto.randomUUID(), items: data[field].items }
          ];
        }
      }
    }
  }
  return data;
}

// --- Unified Hook ---
export function useResumeManager(id: string) {
  const fullKey = `resume-${id}`;
  const [data, setData] = useState(null);

  // save
  const save = useCallback(
    (value) => {
      const { type, data } = value;

      setData((p) => {
        p[type] = data;

        localStorage.setItem(fullKey, JSON.stringify({ updatedAt: Date.now(), ...p }));

        return p;
      });

      saveFormData(value);
    },
    [fullKey],
  );

  // load + merge defaults on mount
  useEffect(() => {
    (async () => {
      const [actualData, emptyData] = await Promise.all([getResumeData(id), getResumeEmptyData()]);
      const localData = JSON.parse(localStorage.getItem(fullKey) ?? '{}');
      console.log(localData);

      let finalData = actualData;

      if (!Object.keys(localData).length) {
        finalData = actualData;
      } else if (!actualData.updatedAt) {
        finalData = localData;
      } else if (actualData.updatedAt > localData.updatedAt) {
        finalData = actualData;
      } else {
        finalData = localData;
      }

      for (const key of Object.keys(emptyData)) {
        finalData[key] = deepMerge(finalData[key], emptyData[key]);
      }

      finalData = normalizeStringsFields(finalData);

      setData(finalData);
    })();
  }, [id]);

  return { data, save };
}
