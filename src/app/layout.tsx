import '@/app/globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ClarityInit } from '@/analytics/ClarityInit';
import BaseLayout from '@/components/layout/BaseLayout';
import { FeatureFlagProvider } from '@/contexts/FeatureFlagContext';
import { MaintenanceModeWrapper } from '@/screens/MaintenanceMode';
import Umami from '@/analytics/Umami/Umami';

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nightstem',
  description:
    'Nightstem is a software studio creating thoughtful, minimal tools and digital experiences — quietly crafted after hours.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FeatureFlagProvider>
          <MaintenanceModeWrapper isMaintenanceModeOn={IS_PRODUCTION}>
            <BaseLayout>{children}</BaseLayout>
          </MaintenanceModeWrapper>
        </FeatureFlagProvider>

        <Umami />
        <ClarityInit />
      </body>
    </html>
  );
}
