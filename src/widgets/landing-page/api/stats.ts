import { fetch } from "@shared/api";

export interface LatestUser {
  firstName: string | null;
  lastName: string | null;
}

export interface CurrentStats {
  totalResumes: number;
  totalUsers: number;
  latestUsers?: LatestUser[];
}

export const getCurrentStats = async (): Promise<CurrentStats> => {
  const response = await fetch<CurrentStats>("monitoring/stats", {
    options: {
      method: "GET",
    },
  });

  return response;
};
