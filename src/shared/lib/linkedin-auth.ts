import { fetch } from '@shared/api';

export const getLinkedInAuthUrl = () => {
  const state = Math.random().toString(36).substring(2, 15);
  localStorage.setItem('linkedin_oauth_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || '77r4muxaihs19b',
    redirect_uri:
      process.env.NEXT_PUBLIC_REDIRECT_URI || "https://resume-builder.craftstacks.co/auth/linkedin/callback",
    scope: 'openid profile email',
    state: state,
  });

  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
};

export const sendAuthCodeToBackend = async (authCode: string) => {
  if (!authCode) {
    throw new Error('Auth code is required');
  }

  try {
    const response = await fetch('auth/linkedin-signin', {
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          authCode: authCode,
          redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
        }),
      },
    });

    return response;
  } catch (error) {
    console.error('Error authenticating with backend:', error);

    throw error;
  }
};
