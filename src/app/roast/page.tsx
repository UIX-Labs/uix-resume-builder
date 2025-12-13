"use client";

import Spotlight from "@shared/icons/spotlight";
import { cn } from "@shared/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { fetch } from "@shared/api";
import { RoastLoading } from "./components/roast-loading";
import { TypewriterRoast } from "./components/typewriter-roast";

import { trackEvent } from "@shared/lib/analytics/Mixpanel";

export default function RoastPage() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<string | null>(null);

  const roastResume = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch<{ roast: string }>("resume/roast", {
        options: {
          method: "POST",
          body: formData,
        },
      });
      return response;
    } catch (error) {
      console.error("Error roasting resume:", error);
      throw new Error("Failed to roast resume");
    }
  };

  const { mutate: roastResumeMutation, isPending } = useMutation({
    mutationFn: roastResume,
    onSuccess: (data) => {
      toast.success("Resume roasted successfully");
      setResponse(data.roast);
      trackEvent("roast_resume_success", {
        timestamp: new Date().toISOString(),
      });
    },
    onError: () => {
      toast.error("Failed to roast resume");
    },
  });
  const shouldHideOverflow = !response || isPending;
  const isFireFixed = !response || isPending;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  function handleFileUpload(file: File) {
    roastResumeMutation(file);
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
    trackEvent("roast_resume_upload_click", {
      timestamp: new Date().toISOString(),
    });
  };

  const handleUploadKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onUploadClick();
    }
  };

  return (
    <div
      className={cn(
        "relative min-h-screen bg-white w-full font-sans overflow-x-hidden",
        shouldHideOverflow && "overflow-hidden"
      )}
    >
      <div
        className={cn("absolute inset-0", "[background-size:20px_20px]")}
        style={{
          backgroundImage: "url('/images/RoastBackground.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Spotlight className="absolute inset-0" />

      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {/* <Header /> */}
        <div className="flex flex-col items-center w-full pt-12 pb-8 md:pt-16 md:pb-12 lg:pt-8 lg:pb-4 px-5 flex-1 ">
          <div className="flex flex-col items-center justify-between gap-18">
            <div className="flex flex-col items-center justify-center ">
              <Image
                src={"/images/mobile-logo.png"}
                alt="AI"
                width={200}
                height={70}
                className="inline-block"
              />
            </div>
            <div className="flex flex-col items-center justify-between gap-4 w-full md:w-1/2">
              <h1 className="text-lg lg:text-[32px] font-normal leading-tight text-center text-white">
                Your resume is holding you back.
              </h1>

              <span className="text-4xl rounded-full text-white font-semibold shadow-lg lg:text-base py-1.5 lg:py-1 px-4 text-center">
                Let’s roast it. Then fix it.
              </span>
            </div>
          </div>

          {isPending ? (
            <div className="w-full md:w-1/2 mt-6 lg:mt-3">
              <RoastLoading />
            </div>
          ) : response ? (
            <div className="w-full md:w-1/2 mt-6 lg:mt-3 mb-8 lg:mb-4">
              <TypewriterRoast
                content={response || ""}
                onRoastAnother={() => setResponse(null)}
              />
            </div>
          ) : (
            <div
              className={cn(
                "border-2 border-[#C66101] border-dashed rounded-[16px] px-6 py-8 lg:px-[32px] lg:py-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center transition-colors cursor-pointer mt-6 lg:mt-3 w-full md:w-1/2",
                "bg-gradient-to-br from-[#0D0600] to-[#B35802]",
                isDragging ? "border-[#005ff2]" : "hover:opacity-95"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={onUploadClick}
              onKeyDown={handleUploadKeyDown}
              role="button"
              tabIndex={0}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf"
              />
              <h2 className="text-[#FFA855] text-[24px] lg:text-[16px] font-semibold mb-1.5 lg:mb-1">
                Roast My Resume
              </h2>

              <div className=" w-12 h-12 lg:w-11 lg:h-11 rounded-full flex items-center justify-center mb-2 lg:mb-2">
                <div className="relative w-6 h-6 lg:w-5 lg:h-5">
                  <UploadIcon className="w-6 h-6 lg:w-5 lg:h-5 text-[#FFA855]" />
                </div>
              </div>

              <p className="text-[#FFA855] text-sm mb-3 lg:mb-2">
                Select File from device
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
