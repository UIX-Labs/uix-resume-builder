'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { sendAuthCodeToBackend } from '@/shared/lib/linkedin-auth';

export default function LinkedInCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams?.get('code');
      const error = searchParams?.get('error');
      const receivedState = searchParams?.get('state');
      const expectedState = localStorage.getItem('linkedin_oauth_state');

      if (receivedState !== expectedState) {
        setError('State mismatch. Possible CSRF attack.');
        setLoading(false);
        return;
      }

      if (error) {
        setError(`LinkedIn authentication failed: ${error}`);
        setLoading(false);
        return;
      }

      if (!code) {
        setError('No authorization code received from LinkedIn');
        setLoading(false);
        return;
      }

      try {
        setSuccess('Authenticating with backend...');

        const authResponse = await sendAuthCodeToBackend(code) as any;

        if (authResponse.status === 'success') {
          setSuccess('Authentication successful! Redirecting...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        } else {
          setError(authResponse.message || 'Authentication failed');
          setLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to authenticate with backend');
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (loading && !success) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-green-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>{success}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600 max-w-md px-4">
          <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
          <p className="mb-4">{error}</p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}
