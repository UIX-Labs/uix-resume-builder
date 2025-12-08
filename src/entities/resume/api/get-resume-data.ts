import { fetch } from "@shared/api";

import type { ResumeData } from "../types/resume-data";

export interface ResumeDataResponse extends ResumeData {
  isAnalyzed?: boolean;
}

export async function getResumeData(id: string) {
  const data = await fetch<ResumeDataResponse>(`resume/${id}`);

  return data;
}
