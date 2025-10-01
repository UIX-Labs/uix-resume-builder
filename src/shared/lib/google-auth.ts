import { fetch } from '@shared/api';

export const getGoogleAuthUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id:
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      '734259134241-mkh3k8ri97si6hpuqeg3vcma6ng6ubfd.apps.googleusercontent.com',
    redirect_uri:
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'https://resume-builder.craftstacks.co/auth/google/callback',
    scope: 'openid profile email',
    access_type: 'offline',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export const sendAuthCodeToBackend = async (authCode: string) => {
  if (!authCode) {
    throw new Error('Auth code is required');
  }

  try {
    const response = await fetch('auth/google-signin', {
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          authCode: authCode,
          redirectUri:
            process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'https://resume-builder.craftstacks.co/auth/google/callback',
        }),
      },
    });

    return response;
  } catch (error) {
    console.error('Error authenticating with backend:', error);

    throw error;
  }
};
