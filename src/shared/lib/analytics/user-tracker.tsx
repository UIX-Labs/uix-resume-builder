"use client";

import { useEffect } from "react";
import { useUserProfile } from "@shared/hooks/use-user";
import { setUserId, setUserProperties } from "./Mixpanel";

export function UserTracker() {
  const { data: user } = useUserProfile();

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);

      setUserProperties({
        $email: user.email,
        $name: user.firstName + " " + user?.lastName,
        $first_name: user.firstName,
        $last_name: user?.lastName,
        $is_verified: user.isVerified,
        $is_logged_in: user.isLoggedIn,
        $is_verified_account: user.isVerified
      });
    }
  }, [user]);

  return null;
}
