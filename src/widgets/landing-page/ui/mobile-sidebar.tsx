"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/shared/ui/components/button";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useCachedUser } from "@shared/hooks/use-user";
import { cn } from "@shared/lib/cn";
import { trackEvent } from "@shared/lib/analytics/Mixpanel";
import { useState } from "react";
import { MobileTextView } from "./mobile-text-view";
import { LOGOS } from "@shared/lib/image-assets";

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCachedUser();
  const [showMobileTextView, setShowMobileTextView] = useState(false);

  const handleNavigation = (
    path: string,
    eventName: string,
    destination: string
  ) => {
    // For routes that need desktop, show the mobile text view
    if (path === "/auth") {
      setShowMobileTextView(true);
      trackEvent(eventName, {
        source: "mobile_sidebar",
        destination,
        blocked: "mobile_device",
      });
      return;
    }
    router.push(path);
    onClose();
    trackEvent(eventName, {
      source: "mobile_sidebar",
      destination,
    });
  };

  const handleHomeClick = () => {
    handleNavigation("/", "navigation_click", "home");
  };

  const handleRoastClick = () => {
    handleNavigation("/roast", "navigation_click", "roast");
  };

  const handleAboutUsClick = () => {
    handleNavigation("/about-us", "navigation_click", "about_us");
  };

  const handleDashboardClick = () => {
    const destination = user ? "dashboard" : "auth";
    setShowMobileTextView(true);
    trackEvent("navigation_click", {
      source: "mobile_sidebar",
      destination,
      action: user ? "dashboard" : "sign_in",
      blocked: "mobile_device",
    });
  };

  const handleCreateResumeClick = () => {
    setShowMobileTextView(true);
    trackEvent("create_resume_click", {
      source: "mobile_sidebar",
      method: "create_my_resume",
      blocked: "mobile_device",
    });
  };

  const navItems = [
    {
      label: "Home",
      onClick: handleHomeClick,
      isActive: pathname === "/",
    },
    {
      label: "Roast",
      onClick: handleRoastClick,
      isActive: pathname === "/roast",
    },
    {
      label: user ? "Dashboard" : "Sign In",
      onClick: handleDashboardClick,
      isActive: pathname === "/dashboard" || pathname === "/auth",
    },
    {
      label: "About Us",
      onClick: handleAboutUsClick,
      isActive: pathname === "/about-us",
    },
  ];

  const handleLogoClick = () => {
    handleNavigation("/", "navigation_click", "home");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-white z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <button className="flex items-center gap-2" onClick={handleLogoClick} type="button">
                    <Image
                      src={LOGOS.PIKA_RESUME}
                      alt="Pika Resume"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-bold text-[#005FF2] text-xl">
                          Pika
                        </span>
                        <span className="font-normal text-[#21344F] text-xl">
                          Resume
                        </span>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={item.onClick}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors",
                            item.isActive
                              ? "bg-blue-100 text-blue-900"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Create Resume Button */}
                <div className="p-4 border-t border-gray-100">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleCreateResumeClick}
                    className="w-full bg-blue-900 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-sm"
                  >
                    Create My Resume
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Text View - Shows when user tries to access desktop-only features */}
      <MobileTextView
        isOpen={showMobileTextView}
        onClose={() => setShowMobileTextView(false)}
      />
    </>
  );
};
