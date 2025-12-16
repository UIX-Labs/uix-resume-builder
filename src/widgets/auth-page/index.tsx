"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/shared/ui/components/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCheckEmailExists,
  useLoginUser,
  useRegisterUser,
  useVerifyOtp,
  validateEmail,
  validatePassword,
} from "@entities/auth-page/api/auth-queries";
import { AuthHeader } from "./ui/auth-header";
import { VideoBackground } from "./ui/video-background";
import Image from "next/image";
import GoogleSignInButton from "@shared/ui/components/google-signin-button";
import { cn } from "@shared/lib/utils";
import { ICONS } from "@shared/lib/image-assets";
import LinkedInSignInButton from "@shared/ui/components/linkedIn-signin-button";
import { trackEvent } from "@shared/lib/analytics/Mixpanel";

export default function AuthPageWidget() {
  const router = useRouter();

  const [step, setStep] = useState<
    "initial" | "email" | "password" | "code" | "register" | "socialAccounts"
  >("initial");

  const [email, setEmail] = useState("");

  const [loginCode, setLoginCode] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [socialAccounts, setSocialAccounts] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState({
    password: true,
    confirmPassword: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  const toggleShow = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const checkEmailMutation = useCheckEmailExists();

  const verifyOtpMutation = useVerifyOtp();

  const registerMutation = useRegisterUser();

  const loginMutation = useLoginUser();

  const clearErrors = () => {
    setErrors({});
  };

  const handleEmailSubmit = async () => {
    clearErrors();

    if (!email.trim()) {
      setErrors({ email: "Email is required*" });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    checkEmailMutation.mutate(email, {
      onSuccess: (emailCheckResult) => {
        const emailExists = emailCheckResult.emailExists ?? false;

        if (emailExists) {
          if (
            emailCheckResult.hasPassword === false &&
            emailCheckResult.socialAccounts
          ) {
            setSocialAccounts(emailCheckResult.socialAccounts);
            setStep("socialAccounts");
          } else {
            setStep("password");
          }
        } else {
          setStep("code");

          setTimeout(() => {
            if (codeInputRef.current) {
              codeInputRef.current.focus();
            }
          }, 100);
        }
      },
      onError: (error) => {
        setErrors({ email: "Failed to process email. Please try again." });
      },
    });
  };

  const handlePasswordSubmit = async () => {
    clearErrors();

    if (!password.trim()) {
      setErrors({ password: "Password is required*" });
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          trackEvent('login_success', { method: 'email' });
          router.push("/dashboard");
        },
        onError: (error) => {
          setErrors({ password: "Invalid password. Please try again." });
        },
      }
    );
  };

  const handleCodeSubmit = async () => {
    clearErrors();

    if (!loginCode.trim()) {
      setErrors({ code: "Login code is required*" });
      return;
    }

    if (loginCode.length !== 6) {
      setErrors({ code: "Please enter a valid 6-digit code" });
      return;
    }

    verifyOtpMutation.mutate(
      { email, otp: loginCode },
      {
        onSuccess: () => {
          setStep("register");
        },
        onError: (error) => {
          setErrors({ code: "Invalid or expired OTP. Please try again." });
        },
      }
    );
  };

  const handleRegistrationSubmit = async () => {
    clearErrors();
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required*";

    if (!lastName.trim()) newErrors.lastName = "Last name is required*";

    if (!password.trim()) newErrors.password = "Password is required*";

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be 6-32 characters and contain at least one lowercase letter, one uppercase letter, and one digit";
    }
    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required*";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    registerMutation.mutate(
      {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      },
      {
        onSuccess: (data) => {
          trackEvent('registration_success', { method: 'email' });
          router.push("/dashboard");
        },
        onError: (error) => {
          setErrors({ submit: "Registration failed. Please try again." });
        },
      }
    );
  };

  useEffect(() => {
    if (step === "email" && emailInputRef.current) {
      emailInputRef.current.focus();
    }
    if (step === "code" && codeInputRef.current) {
      codeInputRef.current.focus();
    }
    if (step === "password" && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [step]);

  const isLoading =
    checkEmailMutation.isPending ||
    verifyOtpMutation.isPending ||
    registerMutation.isPending ||
    loginMutation.isPending;

  return (
    <div className="flex items-center justify-center gap-3">
      <VideoBackground />

      <div className="flex-1 flex flex-col min-h-screen w-[50%] pt-4">
        <AuthHeader />

        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-sm space-y-8"
          >
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[63px] font-semibold text-slate-800 -tracking-[3%] leading-[63px]">
                Build Your
              </h2>

              <h2 className="text-[63px] font-black text-slate-800 whitespace-nowrap -tracking-[3%] leading-[63px]">
                Perfect Resume
              </h2>
            </div>

            {(step === "initial" || step === "email") && (
              <>
                <div className="flex flex-col items-center justify-center gap-4">
                  <LinkedInSignInButton />

                  <GoogleSignInButton />
                </div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-950 opacity-40"></span>

                  <span className="text-lg font-semibold text-[rgb(102,102,102)] whitespace-nowrap">
                    or
                  </span>

                  <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-950 opacity-40"></span>
                </div>
              </>
            )}

            {step === "initial" && (
              <div className="text-center">
                <Button
                  onClick={() => setStep("email")}
                  disabled={isLoading}
                  className="py-8 px-[139.5px] text-[rgba(149,157,168,1)] text-base font-semibold rounded-xl border-2 border-white shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer bg-[linear-gradient(273deg,rgb(226,238,255)_3.19%,rgb(241,247,255)_84.37%)] hover:bg-[linear-gradient(273deg,rgb(102,141,193)_3.19%,rgb(66,72,80)_84.37%)] hover:scale-105 hover:text-white"
                >
                  See other Option
                </Button>
              </div>
            )}

            {step === "email" && (
              <div className="flex flex-col justify-start gap-4">
                <input
                  type="email"
                  ref={emailInputRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                  placeholder="Enter email address"
                  className={cn(
                    "w-[404px] rounded-xl border px-3 py-3 font-semibold bg-[rgba(242,242,242,1)] focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder:text-base placeholder:leading-5.5 placeholder:-tracking-[0.18px] placeholder:font-normal placeholder:text-[rgba(201,201,201,1)]",
                    {
                      "border-red-500": errors.password,
                      "border-[rgba(202,212,225,1)]": !errors.password,
                    }
                  )}
                  disabled={isLoading}
                />

                {errors.email && (
                  <div className="text-red-500 text-sm text-start w-[404px]">
                    {errors.email}
                  </div>
                )}

                <Button
                  onClick={handleEmailSubmit}
                  loading={isLoading}
                  className="w-[404px] text-white text-center py-6 px-3 border-2 border-white font-semibold rounded-xl text-base leading-5.5 -tracking-[0.18px] bg-black hover:[background:radial-gradient(84.7%_171.87%_at_50%_144.79%,rgb(77,153,255)_0%,rgb(23,23,23)_100%)] transition-all duration-300"
                >
                  Continue
                </Button>
              </div>
            )}

            {step === "password" && (
              <div className="flex flex-col justify-start gap-4">
                <p className="text-neutral-500 text-center text-sm">
                  Welcome back! Please enter your password for {email}
                  <button
                    onClick={() => setStep("email")}
                    disabled={isLoading}
                    className="font-semibold hover:underline ml-1 text-blue-600"
                  >
                    Not you?
                  </button>
                </p>

                <div className="relative w-[404px]">
                  <input
                    type={showPassword.password ? "password" : "text"}
                    ref={passwordInputRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handlePasswordSubmit()
                    }
                    placeholder="Enter your password"
                    className={cn(
                      "w-full rounded-xl border px-3 py-3 pr-12 font-semibold bg-[rgba(242,242,242,1)] focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder:text-base placeholder:leading-5.5 placeholder:-tracking-[0.18px] placeholder:font-normal placeholder:text-[rgba(201,201,201,1)]",
                      {
                        "border-red-500": errors.password,
                        "border-[rgba(202,212,225,1)]": !errors.password,
                      }
                    )}
                    disabled={isLoading}
                  />

                  <button
                    type="button"
                    onClick={() => toggleShow("password")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Image
                      src={
                        showPassword.password
                          ? ICONS.EYE_OFF
                          : ICONS.EYE_OPEN
                      }
                      alt={
                        showPassword.password
                          ? "Hide password"
                          : "Show password"
                      }
                      width={20}
                      height={20}
                    />
                  </button>
                </div>

                {errors.password && (
                  <div className="text-red-500 text-sm text-start w-[404px]">
                    {errors.password}
                  </div>
                )}

                <Button
                  onClick={handlePasswordSubmit}
                  loading={isLoading}
                  className="w-[404px] text-white text-center py-6 px-3 border-2 border-white font-semibold rounded-xl text-base leading-5.5 -tracking-[0.18px] bg-black hover:[background:radial-gradient(84.7%_171.87%_at_50%_144.79%,rgb(77,153,255)_0%,rgb(23,23,23)_100%)] transition-all duration-300"
                >
                  Login
                </Button>
              </div>
            )}

            {step === "code" && (
              <div className="flex flex-col items-center justify-center gap-4 text-sm leading-5 -tracking-[0.02px]">
                {errors.code && (
                  <div className="text-red-500 text-sm text-start w-[404px]">
                    {errors.code}
                  </div>
                )}

                <p className="text-neutral-500 text-center whitespace-nowrap">
                  We sent a temporary login code to {email} <br />
                  <button
                    onClick={() => setStep("email")}
                    disabled={isLoading}
                    className="font-semibold hover:underline ml-1"
                  >
                    Not you?
                  </button>
                </p>

                <input
                  type="text"
                  ref={codeInputRef}
                  value={loginCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setLoginCode(value);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
                  placeholder="Enter login code"
                  className={cn(
                    "w-[404px] rounded-xl border bg-[rgba(242,242,242,1)] font-semibold px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder:text-base placeholder:leading-5.5 placeholder:-tracking-[0.18px] placeholder:text-[rgba(201,201,201,1)]",
                    {
                      "border-red-500": errors.password,
                      "border-[rgba(202,212,225,1)]": !errors.password,
                    }
                  )}
                  disabled={isLoading}
                />

                {errors.code && (
                  <div className="text-red-500 text-sm text-start w-[404px]">
                    {errors.code}
                  </div>
                )}

                <Button
                  onClick={handleCodeSubmit}
                  loading={isLoading}
                  className="w-[404px] text-white text-center border-2 border-white py-6 px-3 font-semibold rounded-xl text-base leading-5.5 -tracking-[0.18px] bg-black hover:[background:radial-gradient(84.7%_171.87%_at_50%_144.79%,rgb(77,153,255)_0%,rgb(23,23,23)_100%)] transition-all duration-300"
                >
                  Continue
                </Button>
              </div>
            )}

            {step === "socialAccounts" && (
              <div className="flex flex-col items-center justify-center gap-6 text-sm leading-5 -tracking-[0.02px]">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Account Found!
                    </h3>

                    <p className="text-neutral-600 text-center">
                      You're already registered with{" "}
                      <span className="font-semibold">{email}</span> using:
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      {socialAccounts.map((account) => (
                        <span
                          key={account}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {account}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-neutral-500 mt-4">
                      Please use one of the social login options above to
                      continue.
                    </p>
                  </div>

                  <button
                    onClick={() => setStep("email")}
                    className="text-blue-600 hover:underline text-sm font-semibold"
                  >
                    Try a different email
                  </button>
                </div>
              </div>
            )}

            {step === "register" && (
              <div className="flex flex-col items-center justify-center gap-4 text-sm leading-5 -tracking-[0.02px]">
                {errors.submit && (
                  <div className="text-red-500 text-sm text-center w-[404px]">
                    {errors.submit}
                  </div>
                )}

                <p className="text-neutral-500 text-center whitespace-nowrap">
                  your journey starts here - secure it with a strong password{" "}
                </p>

                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name*"
                  className={cn(
                    "w-[404px] rounded-xl text-base font-semibold border bg-[rgba(242,242,242,1)] px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder:text-base placeholder:leading-5.5 placeholder:-tracking-[0.18px] placeholder:font-normal placeholder:text-[rgba(201,201,201,1)]",
                    {
                      "border-red-500": errors.password,
                      "border-[rgba(202,212,225,1)]": !errors.password,
                    }
                  )}
                  disabled={isLoading}
                />

                {errors.firstName && (
                  <div className="text-red-500 text-xs -mt-2 w-[404px] text-left">
                    {errors.firstName}
                  </div>
                )}

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name*"
                  className={cn(
                    "w-[404px] rounded-xl text-base font-semibold border bg-[rgba(242,242,242,1)] px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder:text-base placeholder:leading-5.5 placeholder:-tracking-[0.18px] placeholder:font-normal placeholder:text-[rgba(201,201,201,1)]",
                    {
                      "border-red-500": errors.password,
                      "border-[rgba(202,212,225,1)]": !errors.password,
                    }
                  )}
                  disabled={isLoading}
                />

                {errors.lastName && (
                  <div className="text-red-500 text-xs -mt-2 w-[404px] text-left">
                    {errors.lastName}
                  </div>
                )}

                <div className="relative w-[404px]">
                  <input
                    type={showPassword.password ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password*"
                    className={cn(
                      "w-full rounded-xl text-base font-semibold border bg-[rgba(242,242,242,1)] px-3 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder:text-base placeholder:leading-5.5 placeholder:-tracking-[0.18px] placeholder:font-normal placeholder:text-[rgba(201,201,201,1)]",
                      {
                        "border-red-500": errors.password,
                        "border-[rgba(202,212,225,1)]": !errors.password,
                      }
                    )}
                    disabled={isLoading}
                  />

                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleShow("password")}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Image
                        src={
                          showPassword.password
                            ? ICONS.EYE_OFF
                            : ICONS.EYE_OPEN
                        }
                        alt={
                          showPassword.password
                            ? "Hide password"
                            : "Show password"
                        }
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>

                {errors.password && (
                  <div className="text-red-500 text-xs -mt-2 w-[404px] text-left">
                    {errors.password}
                  </div>
                )}

                <div className="relative w-[404px]">
                  <input
                    type={showPassword.confirmPassword ? "password" : "text"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleRegistrationSubmit()
                    }
                    placeholder="Confirm Password*"
                    className={cn(
                      "w-[404px] rounded-xl text-base font-semibold border bg-[rgba(242,242,242,1)] px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder:text-base placeholder:leading-5.5 placeholder:-tracking-[0.18px] placeholder:font-normal placeholder:text-[rgba(201,201,201,1)]",
                      {
                        "border-red-500": errors.confirmPassword,
                        "border-[rgba(202,212,225,1)]": !errors.confirmPassword,
                      }
                    )}
                    disabled={isLoading}
                  />

                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleShow("confirmPassword")}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Image
                        src={
                          showPassword.confirmPassword
                            ? ICONS.EYE_OFF
                            : ICONS.EYE_OPEN
                        }
                        alt={
                          showPassword.confirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>

                {errors.confirmPassword && (
                  <div className="text-red-500 text-xs -mt-2 w-[404px] text-left">
                    {errors.confirmPassword}
                  </div>
                )}

                <Button
                  onClick={handleRegistrationSubmit}
                  loading={isLoading}
                  className="w-[404px] border-2 border-white text-white text-center py-6 px-3 font-semibold rounded-xl text-base leading-5.5 -tracking-[0.18px] bg-black hover:[background:radial-gradient(84.7%_171.87%_at_50%_144.79%,rgb(77,153,255)_0%,rgb(23,23,23)_100%)] placeholder:font-normal transition-all duration-300"
                >
                  Continue
                </Button>
              </div>
            )}

            <p className="text-xs text-slate-500 leading-4.5 whitespace-nowrap text-center">
              By continuing, you agree to Resume Builder's{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
