import 'server-only';

// import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Arimo, Inter, Open_Sans } from 'next/font/google';
import CanvasGradientInner from './components/canvas-gradient-inner';
import Navbar from './components/navbar';
import './globals.css';
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
    canonical: 'https://ctrl-f.plus',
  },
  description:
    'Ctrl-F Plus is an open source productivity Chrome extension that enables you to search through all open tabs using the keyboard shortcut Ctrl-Shift-F. Effortlessly locate specific content, keywords, or phrases across multiple tabs and boost your productivity',
  openGraph: {
    title: 'Ctrl-F Plus: Ctrl + F Search Across All Tabs',
    description:
      'Ctrl-F Plus is an open source productivity Chrome extension that enables you to search through all open tabs using the keyboard shortcut Ctrl+Shift+F. Effortlessly locate specific content, keywords, or phrases across multiple tabs and increase your productivity',
    url: 'https://ctrl-f.plus',
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
      // bg-gradient-cyan/50
      className={`${inter.variable} ${open_sans.variable} ${arimo.variable} h-full scroll-smooth antialiased`}
    >
      <body className="debug-screens mx-auto flex min-h-full flex-col ">
        <div className="relative flex flex-auto ">
          {/* <CanvasGradient />
          <CanvasGradientInner /> */}
          {/* <canvas id="gradient-canvas" className="fixed h-screen w-screen " /> */}
          {/* </CanvasGradient> */}
          <div className="absolute inset-0 h-auto w-full overflow-hidden opacity-[.2]">
            <svg
              // width="1440"
              // height="3759"
              viewBox="0 0 1440 3759"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <ellipse
                cx="375.808"
                cy="434.354"
                rx="434.267"
                ry="865.042"
                fill="#f5fbff"
              />
              <ellipse
                cx="1078.25"
                cy="667.018"
                rx="578.915"
                ry="883.331"
                fill="#dde3ee"
              />
              <ellipse
                cx="268.007"
                cy="3035.77"
                rx="486.173"
                ry="722.626"
                fill="#f2effb"
              />
              <ellipse
                cx="1096.43"
                cy="2884.38"
                rx="428.083"
                ry="799.011"
                fill="#d4ece5"
              />
              <ellipse
                cx="699.168"
                cy="1632.22"
                rx="388.683"
                ry="805.958"
                fill="#f5fbff"
              />
            </svg>
          </div>
          <CanvasGradientInner />
          <div
            // backdrop-blur-bg
            className="flex h-auto w-full flex-col backdrop-blur-bg"
          >
            <Navbar />
            <main className="isolate z-10 flex-auto">
              {children}
              {/* <Analytics /> */}
            </main>
            <Footer className="relative z-20" />
          </div>
        </div>
      </body>
    </html>
  );
}
