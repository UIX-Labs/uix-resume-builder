'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/shared/ui//dialog';
import { Button } from '@/shared/ui/components/button';
import { cn } from '@shared/lib/utils';
import Image from 'next/image';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { MobileTextView } from '@widgets/landing-page/ui/mobile-text-view';

import {
  useCheckEmailExists,
  useVerifyOtp,
  useRegisterUser,
  useLoginUser,
  validateEmail,
  validatePassword,
} from '@entities/auth-page/api/auth-queries';

type Step = 'email' | 'code' | 'register' | 'password' | 'socialAccounts';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileAuthModal({ open, onOpenChange }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [guestEmail, setGuestEmail] = useState<string | undefined>(undefined);
  const [socialAccounts, setSocialAccounts] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState({
    password: true,
    confirmPassword: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showMobileRestricted, setShowMobileRestricted] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const checkEmail = useCheckEmailExists();
  const verifyOtp = useVerifyOtp();
  const register = useRegisterUser();
  const login = useLoginUser();

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl');
    if (callbackUrl) {
      localStorage.setItem('auth_callback_url', callbackUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const storedGuestEmail = localStorage.getItem('pending_analyzer_guest_email');
    if (storedGuestEmail) {
      setGuestEmail(storedGuestEmail);
    }
  }, []);

  useEffect(() => {
    if (step === 'email') emailRef.current?.focus();
    if (step === 'code') codeRef.current?.focus();
    if (step === 'password') passwordRef.current?.focus();
  }, [step]);

  const toggleShow = (field: 'password' | 'confirmPassword') => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleAuthSuccessRedirect = () => {
    const storedCallbackUrl = localStorage.getItem('auth_callback_url');
    const pendingResumeId = localStorage.getItem('pending_analyzer_resume_id');
    const shouldOpenJDModal = localStorage.getItem('openJDModal');

    localStorage.removeItem('auth_callback_url');
    localStorage.removeItem('pending_analyzer_guest_email');

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

    // On mobile, instead of redirecting to dashboard, show the restricted view
    onOpenChange(false); // Close the auth modal
    setShowMobileRestricted(true);
  };

  /** ---------------- handlers ---------------- */

  const handleEmailSubmit = () => {
    setErrors({});
    if (!email.trim()) {
      setErrors({ email: 'Email is required*' });
      return;
    }
    if (!validateEmail(email)) {
      setErrors({ email: 'Enter a valid email address' });
      return;
    }

    checkEmail.mutate(
      { email, guestEmail },
      {
        onSuccess: (emailCheckResult) => {
          const emailExists = emailCheckResult.emailExists ?? false;

          if (emailExists) {
            if (emailCheckResult.hasPassword === false && emailCheckResult.socialAccounts) {
              setSocialAccounts(emailCheckResult.socialAccounts);
              setStep('socialAccounts');
            } else {
              setStep('password');
            }
          } else {
            setStep('code');
          }
        },
        onError: () => setErrors({ email: 'Failed to process email' }),
      },
    );
  };

  const handlePasswordSubmit = () => {
    setErrors({});
    if (!password.trim()) {
      setErrors({ password: 'Password is required*' });
      return;
    }

    login.mutate(
      { email, password, guestEmail },
      {
        onSuccess: () => {
          trackEvent('login_success', { method: 'email' });
          handleAuthSuccessRedirect();
        },
        onError: () => setErrors({ password: 'Invalid password' }),
      },
    );
  };

  const handleCodeSubmit = () => {
    setErrors({});
    if (!code.trim()) {
      setErrors({ code: 'Code is required*' });
      return;
    }
    if (code.length !== 6) {
      setErrors({ code: 'Enter a valid 6-digit code' });
      return;
    }

    verifyOtp.mutate(
      { email, otp: code },
      {
        onSuccess: () => setStep('register'),
        onError: () => setErrors({ code: 'Invalid or expired code' }),
      },
    );
  };

  const handleRegister = () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = 'First name is required*';
    if (!lastName.trim()) errs.lastName = 'Last name is required*';
    if (!password.trim()) errs.password = 'Password is required*';
    if (!validatePassword(password)) {
      errs.password =
        'Password must be 6-32 characters and contain at least one lowercase letter, one uppercase letter, and one digit';
    }
    if (!confirmPassword.trim()) errs.confirmPassword = 'Confirm password is required*';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    register.mutate(
      {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        guestEmail,
      },
      {
        onSuccess: () => {
          trackEvent('registration_success', { method: 'email' });
          handleAuthSuccessRedirect();
        },
        onError: () => setErrors({ submit: 'Registration failed' }),
      },
    );
  };

  const isLoading = checkEmail.isPending || verifyOtp.isPending || register.isPending || login.isPending;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[380px] rounded-3xl px-6 py-6">
          <DialogClose className="absolute right-4 top-4 rounded-full bg-black text-white w-8 h-8 z-50">✕</DialogClose>

          {/* EMAIL STEP */}
          {step === 'email' && (
            <>
              <DialogHeader className="items-center z-10">
                <Image src="/images/mail.svg" alt="" width={98} height={98} />
              </DialogHeader>

              <DialogTitle className="text-center text-4xl font-semibold -mt-12">
                Sign in With <span className="font-black">Email Address</span>
              </DialogTitle>

              <input
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                placeholder="Enter email address"
                className={cn('w-full rounded-xl border px-4 py-3 mt-1 bg-[#f2f2f2]', errors.email && 'border-red-500')}
                disabled={isLoading}
              />

              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

              <Button onClick={handleEmailSubmit} className="w-full" loading={isLoading}>
                Continue
              </Button>
            </>
          )}

          {/* PASSWORD STEP */}
          {step === 'password' && (
            <>
              <DialogTitle className="text-center text-4xl font-semibold mt-8">Welcome Back</DialogTitle>
              <p className="text-xs text-center text-gray-500">
                Please enter your password for {email}
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="font-semibold hover:underline ml-1 text-blue-600"
                  disabled={isLoading}
                >
                  Not you?
                </button>
              </p>

              <div className="relative w-full mt-2">
                <input
                  ref={passwordRef}
                  type={showPassword.password ? 'password' : 'text'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                  placeholder="Enter your password"
                  className={cn('w-full rounded-xl border px-4 py-3 pr-10', errors.password && 'border-red-500')}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => toggleShow('password')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                >
                  <Image
                    src={showPassword.password ? '/images/eye-off.svg' : '/images/eye-open.svg'}
                    alt={showPassword.password ? 'Hide password' : 'Show password'}
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

              <Button onClick={handlePasswordSubmit} className="w-full" loading={isLoading}>
                Login
              </Button>
            </>
          )}

          {/* CODE STEP */}
          {step === 'code' && (
            <>
              <DialogTitle className="text-center text-4xl font-semibold mt-16">Enter Code</DialogTitle>

              <p className="text-xs text-center text-gray-500 mt-2">
                We sent a temporary login code to {email}
                <br />
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="font-semibold hover:underline ml-1 text-blue-600"
                  disabled={isLoading}
                >
                  Not you?
                </button>
              </p>

              <input
                ref={codeRef}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
                placeholder="Enter login code"
                className={cn('w-full rounded-xl border px-4 py-3 mt-1', errors.code && 'border-red-500')}
                disabled={isLoading}
              />

              {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}

              <Button onClick={handleCodeSubmit} className="w-full" loading={isLoading}>
                Continue
              </Button>
            </>
          )}

          {/* SOCIAL ACCOUNTS STEP */}
          {step === 'socialAccounts' && (
            <>
              <DialogTitle className="text-center text-2xl font-black">Account Found!</DialogTitle>

              <div className="flex flex-col items-center justify-center gap-4 mt-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <p className="text-sm text-center text-gray-600">
                  You're already registered with <span className="font-semibold">{email}</span> using:
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {socialAccounts.map((account) => (
                    <span
                      key={account}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {account}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-center text-gray-500">
                  Please use one of the social login options to continue.
                </p>

                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-blue-600 hover:underline text-sm font-semibold"
                >
                  Try a different email
                </button>
              </div>
            </>
          )}

          {/* REGISTER STEP */}
          {step === 'register' && (
            <>
              <DialogTitle className="text-center text-4xl font-black mt-16">Enter Details</DialogTitle>

              {errors.submit && <p className="text-red-500 text-xs text-center mt-1">{errors.submit}</p>}

              <input
                placeholder="First Name"
                className={cn('mt-1 w-full rounded-xl border px-4 py-3', errors.firstName && 'border-red-500')}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}

              <input
                placeholder="Last Name"
                className={cn('w-full rounded-xl border px-4 py-3', errors.lastName && 'border-red-500')}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}

              <div className="relative mt-3 w-full">
                <input
                  type={showPassword.password ? 'password' : 'text'}
                  placeholder="Password"
                  className={cn('w-full rounded-xl border px-4 py-3 pr-10', errors.password && 'border-red-500')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => toggleShow('password')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                >
                  <Image
                    src={showPassword.password ? '/images/eye-off.svg' : '/images/eye-open.svg'}
                    alt={showPassword.password ? 'Hide password' : 'Show password'}
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

              <div className="relative w-full">
                <input
                  type={showPassword.confirmPassword ? 'password' : 'text'}
                  placeholder="Confirm Password"
                  className={cn('w-full rounded-xl border px-4 py-3 pr-10', errors.confirmPassword && 'border-red-500')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => toggleShow('confirmPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                >
                  <Image
                    src={showPassword.confirmPassword ? '/images/eye-off.svg' : '/images/eye-open.svg'}
                    alt={showPassword.confirmPassword ? 'Hide password' : 'Show password'}
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}

              <Button onClick={handleRegister} className="w-full" loading={isLoading}>
                Continue
              </Button>
            </>
          )}

          <p className="mt-2 text-[11px] text-center text-gray-400">
            By continuing, you agree to Resume Builder’s Terms & Privacy Policy
          </p>
        </DialogContent>
      </Dialog>
      <MobileTextView isOpen={showMobileRestricted} onClose={() => router.push('/')} />
    </>
  );
}
