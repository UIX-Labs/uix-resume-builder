"use client";

import { useEffect } from "react";
import { initAnalytics } from "@shared/lib/analytics/Mixpanel";

export function AnalyticsProvider() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
