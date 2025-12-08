import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';

import { Providers } from './providers';
import { PerceptProvider } from '@/shared/lib/analytics/percept-provider';
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
        <PerceptProvider />
        <Providers>
          <UserTracker />
          {children}
        </Providers>
      </body>
    </html>
  );
}
