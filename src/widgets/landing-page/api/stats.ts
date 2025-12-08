import { fetch } from "@shared/api";

export interface CurrentStats {
  totalResumes: number;
  totalUsers: number;
}

export const getCurrentStats = async (): Promise<CurrentStats> => {
  const response = await fetch<CurrentStats>("monitoring/stats", {
    options: {
      method: "GET",
    },
  });

  return response;
};
