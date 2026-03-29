import 'server-only';

import { CloudWatchRUM } from '@/src/components/utility/cloudwatch-rum';
import { SentryInit } from '@/src/components/utility/sentry-init';
import { clientEnv } from '@/src/clientEnv';
import { Metadata } from 'next';
import { Arimo, Inter, Open_Sans } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import Footer from '@/src/components/footer';
import Navbar from '@/src/components/navbar';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const open_sans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const arimo = Arimo({
  subsets: ['latin'],
  variable: '--font-arimo',
});

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_APP_URL),
  title: {
    default: 'Ctrl-F Plus: Ctrl+F Search Across All Tabs',
    template: '%s | Ctrl-F Plus',
  },
  alternates: {
    canonical: `${clientEnv.NEXT_PUBLIC_APP_URL}/`,
  },
  description:
    'Ctrl-F Plus is an open source productivity Chrome extension that enables you to search through all open tabs using the keyboard shortcut Ctrl-Shift-F. Effortlessly locate specific content, keywords, or phrases across multiple tabs and boost your productivity',
  openGraph: {
    title: 'Ctrl-F Plus: Ctrl + F Search Across All Tabs',
    description:
      'Ctrl-F Plus is an open source productivity Chrome extension that enables you to search through all open tabs using the keyboard shortcut Ctrl+Shift+F. Effortlessly locate specific content, keywords, or phrases across multiple tabs and increase your productivity',
    url: clientEnv.NEXT_PUBLIC_APP_URL,
    siteName: 'Ctrl-F Plus Chrome Extension',
    locale: 'en-US',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicons/favicon.ico',
    shortcut: '/favicons/favicon-16x16.png',
    apple: '/favicons/apple-touch-icon.png',
  },
  manifest: '/favicons/site.webmanifest',
  verification: {
    google: 'Wgz24WvJ2hsxTmxjZD_ZyDD_UvU8Z9Lw0eMDN5sa--g',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${open_sans.variable} ${arimo.variable} h-full scroll-smooth bg-gradient-cyan/50 antialiased`}
    >
      <body className="debug-screens mx-auto flex min-h-full flex-col ">
        <div className="relative flex flex-auto ">
          <div className="flex h-auto w-full flex-col backdrop-blur-md">
            <Navbar />
            <main className="isolate z-10 flex-auto">{children}</main>
            <Suspense fallback={<></>}>
              <Footer className="relative z-20" />
            </Suspense>
          </div>
        </div>
        <CloudWatchRUM />
        <SentryInit />
        {/* Cloudflare Web Analytics — loads only when NEXT_PUBLIC_CF_ANALYTICS_TOKEN is set */}
        {clientEnv.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <Script
            strategy="afterInteractive"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token":"${clientEnv.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  );
}
