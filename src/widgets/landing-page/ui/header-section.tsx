"use client";
import React, { useState } from "react";
import { Button } from "@/shared/ui/components/button";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useCachedUser } from "@shared/hooks/use-user";
import { Menu } from "lucide-react";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { MobileSidebar } from "./mobile-sidebar";
import { cn } from "@shared/lib/cn";
import { trackEvent } from "@/shared/lib/analytics/percept";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCachedUser();
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleNavigate = () => {
    router.push(user ? "/dashboard" : "/auth");
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setShowMobileSidebar(true);
    }
  };

  const handleHomeClick = () => {
    router.push("/");
    trackEvent("navigation_click", {
      source: "landing_header",
      destination: "home",
    });
  };

  const handleDashboardClick = () => {
    handleNavigate();
    trackEvent("navigation_click", {
      source: "landing_header",
      destination: user ? "dashboard" : "auth",
      action: user ? "dashboard" : "sign_in",
    });
  };

  const handleAboutUsClick = () => {
    router.push("/about-us");
    trackEvent("navigation_click", {
      source: "landing_header",
      destination: "about_us",
    });
  };

  const handleCreateResumeClick = () => {
    handleNavigate();
    trackEvent("create_resume_click", {
      source: "landing_header",
      method: "create_my_resume",
    });
  };

  const handleRoastClick = () => {
    router.push("/roast");
  };

  return (
    <>
      <header className="w-full flex items-center justify-between px-4 md:px-4 py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Image
            src="/images/Pika-Resume.png"
            alt="AI"
            width={60}
            height={60}
            className="inline-block "
            onClick={handleHomeClick}
          />
          <div className="flex flex-col">
            <div className="flex flex-row">
              <span className="font-bold text-[#005FF2] bg-clip-text text-3xl">
                Pika
              </span>
              <span className="font-normal text-[#21344F] bg-clip-text text-3xl">
                Resume
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <span className="font-normal text-[#005FF2] bg-clip-text text-sm">
                Build Fast.
              </span>
              <span className="font-normal text-[#21344F] bg-clip-text text-sm">
                Build Right.
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-7">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHomeClick}
            className={cn(
              "font-semibold text-lg cursor-pointer",
              pathname === "/"
                ? "bg-blue-200 text-blue-900 hover:bg-blue-300"
                : "text-blue-900 hover:text-gray-900"
            )}
          >
            Home
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRoastClick}
            className={cn(
              "font-semibold text-lg cursor-pointer",
              pathname === "/roast"
                ? "bg-blue-200 text-blue-900 hover:bg-blue-300"
                : "text-blue-900 hover:text-gray-900"
            )}
          >
            Roast
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDashboardClick}
            className={cn(
              "font-semibold text-lg cursor-pointer",
              pathname === "/dashboard" || pathname === "/auth"
                ? "bg-blue-200 text-blue-900 hover:bg-blue-300"
                : "text-blue-900 hover:text-gray-900"
            )}
          >
            {user ? "Dashboard" : "Sign In"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleAboutUsClick}
            className={cn(
              "font-semibold text-lg cursor-pointer",
              pathname === "/about-us"
                ? "bg-blue-200 text-blue-900 hover:bg-blue-300"
                : "text-blue-900 hover:text-gray-900"
            )}
          >
            About Us
          </Button>

          <Button
            variant="default"
            size="default"
            onClick={handleCreateResumeClick}
            className="bg-blue-900 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow-sm cursor-pointer"
          >
            Create My Resume
          </Button>
        </div>

        {/* Mobile Menu Button - Hidden on Desktop */}
        <button
          type="button"
          onClick={handleMenuClick}
          className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar Menu */}
      {isMobile && (
        <MobileSidebar
          isOpen={showMobileSidebar}
          onClose={() => setShowMobileSidebar(false)}
        />
      )}
    </>
  );
}

export default Header;
