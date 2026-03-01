'use client';

import { useCallback, useEffect, useState } from 'react';
import { formatTimeAgo } from '@widgets/form-page-builder/lib/time-helpers';

interface UseSaveTimeParams {
  initialUpdatedAt: string | undefined;
}

export function useSaveTime({ initialUpdatedAt }: UseSaveTimeParams) {
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (initialUpdatedAt) {
      const updatedAt = new Date(initialUpdatedAt).getTime();
      setLastSaveTime(updatedAt);
    }
  }, [initialUpdatedAt]);

  useEffect(() => {
    if (!lastSaveTime) return;

    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, [lastSaveTime]);

  const getFormattedSaveTime = useCallback(() => {
    return formatTimeAgo(lastSaveTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSaveTime, refreshKey]);

  return {
    lastSaveTime,
    setLastSaveTime,
    getFormattedSaveTime,
  };
}
