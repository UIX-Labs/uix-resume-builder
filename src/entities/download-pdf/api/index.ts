import { fetch } from "@shared/api";
import type {
  CheckIfCommunityMemberResponse,
  JoinCommunityResponse,
} from "../types/type";

export type {
  CheckIfCommunityMemberResponse,
  JoinCommunityResponse,
} from "../types/type";

export async function checkIfCommunityMember(data: {
  personal_email?: string;
  uix_email?: string;
  phone_number?: string;
}) {
  const res = await fetch<CheckIfCommunityMemberResponse>(
    "auth/check-if-community-member",
    {
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
    }
  );

  return res;
}

export async function joinCommunity() {
  const res = await fetch<JoinCommunityResponse>("auth/join-community", {
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  return res;
}

export { convertHtmlToPdf } from "./html-to-pdf";
