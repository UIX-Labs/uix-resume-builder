'use client';

import { AlertCircle } from 'lucide-react';

export default function InvalidLinkPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Link Not Valid</h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          The link you clicked is not configured properly or is invalid. Please check the URL and try again.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => window.close()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Close This Tab
          </button>
        </div>
      </div>
    </div>
  );
}
