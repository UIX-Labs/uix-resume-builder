"use client";

import { Button } from "@shared/ui/button";
import { Loader2, Upload } from "lucide-react";

export function UploadStep({
  onUpload,
  onSkip,
  isParsing,
}: {
  onUpload: (file: File) => void;
  onSkip: () => void;
  isParsing: boolean;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type === "application/pdf") onUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-16 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
      >
        {isParsing ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <span className="text-lg text-blue-600 font-medium">
              Parsing resume...
            </span>
            <span className="text-sm text-gray-500">
              This may take up to 60 seconds
            </span>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <span className="text-lg text-gray-700 font-medium">
              Drop a resume PDF here or click to browse
            </span>
            <span className="text-sm text-gray-400 mt-2">
              PDF files up to 5MB
            </span>
          </>
        )}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={isParsing}
        />
      </label>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={onSkip}
          disabled={isParsing}
        >
          Skip upload — fill manually
        </Button>
      </div>
    </div>
  );
}
