import { fetch } from "@shared/api";
import * as Sentry from "@sentry/nextjs";

export const getGoogleAuthUrl = () => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
    scope: "openid profile email",
    access_type: "offline",
    prompt: "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export const sendAuthCodeToBackend = async (authCode: string) => {
  if (!authCode) {
    throw new Error("Auth code is required");
  }

  try {
    const response = await fetch("auth/google-signin", {
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          authCode: authCode,
          redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        }),
      },
    });

    return response;
  } catch (error) {
    console.error("Error authenticating with backend:", error);
    Sentry.captureException(error);
    throw error;
  }
};
