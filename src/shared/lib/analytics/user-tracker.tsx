"use client";

import { useEffect } from "react";
import { useUserProfile } from "@shared/hooks/use-user";
import { setUserId, setUserProperties } from "./percept";

export function UserTracker() {
  const { data: user } = useUserProfile();

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);

      setUserProperties({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: user.isVerified,
        isLoggedIn: user.isLoggedIn,
        isVerifiedAccount: true
      });
    }
  }, [user]);

  return null;
}
