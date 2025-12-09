import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../app/globals.css";

import { Providers } from "./providers";
import { Toaster } from "sonner";

import { UserTracker } from "@/shared/lib/analytics/user-tracker";
import { AnalyticsProvider } from '@shared/lib/analytics/mixpnel-provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Build AI Powered Resume in Minutes",
  description:
    "Choose from practical resume templates and power it with smart resume builder suggestions",
  icons: {
    icon: [
      {
        url: "/images/fav-icons/fav-icon(48*48).png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/images/fav-icons/fav-icon(96*96).png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    shortcut: "/images/fav-icons/fav-icon(48*48).png",
    apple: [
      {
        url: "/images/fav-icons/fav-icon(108*108).png",
        sizes: "108x108",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        <AnalyticsProvider />
        <Providers>
          <UserTracker />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
