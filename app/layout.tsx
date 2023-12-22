import 'server-only';

import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Arimo, Inter, Open_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from './components/navbar';
import './globals.css';
// import CanvasGradientInner from './components/canvas-gradient-inner';
// import '../styles/animated-gradient.css';
// import Script from 'next/script';
// import { Gradient } from './lib/gradient';
// const CanvasGradientInner = dynamic(
//   () => import('./components/canvas-gradient-inner')
// );
// const CanvasGradient = dynamic(() => import('./components/canvas-gradient'));
// import CanvasGradient from './components/canvas-gradient';

const Footer = dynamic(() => import('./components/footer'));

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
  metadataBase: new URL('https://ctrl-f.plus'),
  title: {
    // default: process.env.NEXT_PUBLIC_SITE_NAME,
    default: 'Ctrl-F Plus: Ctrl+F Search Across All Tabs',
    template: '%s | Ctrl-F Plus',
  },
  alternates: {
    // canonical: new URL('https://ctrl-f.plus'),
    // canonical: {new URL((process.env.NEXT_PUBLIC_SITE_URL)},
    canonical: 'https://ctrl-f.plus/',
  },
  description:
    'Ctrl-F Plus is an open source productivity Chrome extension that enables you to search through all open tabs using the keyboard shortcut Ctrl-Shift-F. Effortlessly locate specific content, keywords, or phrases across multiple tabs and boost your productivity',
  openGraph: {
    title: 'Ctrl-F Plus: Ctrl + F Search Across All Tabs',
    description:
      'Ctrl-F Plus is an open source productivity Chrome extension that enables you to search through all open tabs using the keyboard shortcut Ctrl+Shift+F. Effortlessly locate specific content, keywords, or phrases across multiple tabs and increase your productivity',
    url: 'https://ctrl-f.plus/',
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${open_sans.variable} ${arimo.variable} h-full scroll-smooth bg-gradient-cyan/50 antialiased`}
    >
      <body className="debug-screens mx-auto flex min-h-full flex-col ">
        <div className="relative flex flex-auto ">
          {/* <CanvasGradient> */}
          {/* <CanvasGradientInner /> */}
          {/* </CanvasGradient> */}
          <div
            // backdrop-blur-bg
            className="flex h-auto w-full flex-col backdrop-blur-md"
          >
            <Navbar />
            <main className="isolate z-10 flex-auto">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Footer className="relative z-20" />
          </div>
        </div>
      </body>
    </html>
  );
}
