import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import '../app/globals.css';

import { Providers } from './providers';
import { Toaster } from 'sonner';
import { AnalyticsProvider } from '@shared/lib/analytics/mixpnel-provider';
import { UserTracker } from '@/shared/lib/analytics/user-tracker';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Build AI Powered Resume in Minutes',
  description: 'Choose from practical resume templates and power it with smart resume builder suggestions',
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
