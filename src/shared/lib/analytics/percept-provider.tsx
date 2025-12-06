"use client";

import { useEffect } from "react";
import { initPercept } from "@/shared/lib/analytics/percept";

export function PerceptProvider() {
  useEffect(() => {
    initPercept();
  }, []);

  return null;
}
