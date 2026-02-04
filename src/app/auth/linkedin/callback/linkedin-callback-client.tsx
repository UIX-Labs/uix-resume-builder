'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { sendAuthCodeToBackend } from '@/shared/lib/linkedin-auth';
import { clearGuestEmail } from '@shared/lib/guest-email';
import { MobileTextView } from '@widgets/landing-page/ui/mobile-text-view';
import { useIsMobile } from '@shared/hooks/use-mobile';

export default function LinkedInCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showMobileRestricted, setShowMobileRestricted] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams?.get('code');
      const error = searchParams?.get('error');
      const receivedState = searchParams?.get('state');
      const expectedState = localStorage.getItem('linkedin_oauth_state');

      if (receivedState !== expectedState) {
        setError('State mismatch. Possible CSRF attack.');
        queryClient.removeQueries({ queryKey: ['user'] });
        queryClient.removeQueries({ queryKey: ['userProfile'] });
        setLoading(false);
        return;
      }

      if (error) {
        setError(`LinkedIn authentication failed: ${error}`);
        queryClient.removeQueries({ queryKey: ['user'] });
        queryClient.removeQueries({ queryKey: ['userProfile'] });
        setLoading(false);
        return;
      }

      if (!code) {
        setError('No authorization code received from LinkedIn');
        queryClient.removeQueries({ queryKey: ['user'] });
        setLoading(false);
        return;
      }

      try {
        setSuccess('Authenticating...');

        const guestEmail = localStorage.getItem('pending_analyzer_guest_email') || undefined;
        const authResponse = (await sendAuthCodeToBackend(code, guestEmail)) as any;

        if (authResponse.status === 'success') {
          setSuccess('Authentication successful! Redirecting...');
          clearGuestEmail();
          queryClient.invalidateQueries({ queryKey: ['user'] });
          queryClient.invalidateQueries({ queryKey: ['userProfile'] });
          setTimeout(() => {
            if (isMobile) {
              setShowMobileRestricted(true);
              return;
            }

            const pendingResumeId = localStorage.getItem('pending_analyzer_resume_id');
            const shouldOpenJDModal = localStorage.getItem('openJDModal');
            const storedCallbackUrl = localStorage.getItem('auth_callback_url');

            localStorage.removeItem('auth_callback_url');

            if (pendingResumeId) {
              router.push(`/resume/${pendingResumeId}`);
              return;
            }

            if (shouldOpenJDModal === 'true') {
              localStorage.removeItem('openJDModal');
              router.push('/dashboard?openModal=jd');
              return;
            }

            if (storedCallbackUrl) {
              router.push(storedCallbackUrl);
              return;
            }

            router.push('/dashboard');
          }, 1000);
        } else {
          setError(authResponse.message || 'Authentication failed');
          queryClient.removeQueries({ queryKey: ['user'] });
          queryClient.removeQueries({ queryKey: ['userProfile'] });
          setLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to authenticate with backend');
        queryClient.removeQueries({ queryKey: ['user'] });
        queryClient.removeQueries({ queryKey: ['userProfile'] });
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
      <>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center text-green-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p>{success}</p>
          </div>
        </div>
        <MobileTextView isOpen={showMobileRestricted} onClose={() => router.push('/')} />
      </>
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
            onClick={() => router.push('/auth')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Try Again
          </button>
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
