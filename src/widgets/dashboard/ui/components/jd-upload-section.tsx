'use client';

import { UploadCloudIcon } from 'lucide-react';

export function JDUploadSection() {
  return (
    <div className="flex flex-col border-2 border-white rounded-[20px] w-1/2 h-[400px]">
      <div className="flex flex-col border-2 border-[#D6FFEA] rounded-[20px] border-dashed items-center justify-center h-full gap-2">
        <div className="bg-[#DFC500] text-white py-1 px-3 rounded-3xl text-xs font-semibold">Optional</div>
        <h1 className="text-3xl font-semibold">Upload Your JD</h1>
        <UploadCloudIcon className="h-16 w-16" />
        <h3 className="text-2xl font-semibold">Drag & Drop</h3>
        <span>or Select File from your device</span>
      </div>
    </div>
  );
}

