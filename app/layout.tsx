import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Arimo, Inter, Open_Sans } from 'next/font/google';
import CanvasGradient from './components/canvas-gradient';
import Footer from './components/footer';
import Navbar from './components/navbar';
import './globals.css';
import Loading from './loading';

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

const { SITE_NAME } = process.env;

export const metadata: Metadata = {
  metadataBase: new URL('https://ctrl-f.plus'),
  title: {
    // default: SITE_NAME,
    default: 'Ctrl-F Plus - Multi-Tab Search',
    template: '%s | Ctrl-F Plus',
  },
  alternates: {
    // canonical: new URL('https://ctrl-f.plus'),
    canonical: 'https://ctrl-f.plus',
  },
  description:
    'Ctrl-F Plus is an open source productivity Chrome extension that enables you to search through all open tabs using the keyboard shortcut Ctrl-Shift-F. Effortlessly locate specific content, keywords, or phrases across multiple tabs and boost your productivity',
  openGraph: {
    title: 'Ctrl-F Plus',
    description: '',
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

{
  /* <meta
  name="google-site-verification"
  content="Wgz24WvJ2hsxTmxjZD_ZyDD_UvU8Z9Lw0eMDN5sa--g"
/>; */
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${open_sans.variable} ${arimo.variable} h-full scroll-smooth  antialiased`}
    >
      <body className="debug-screens mx-auto flex min-h-full flex-col">
        <div className="relative flex flex-auto ">
          <CanvasGradient />
          <div className="flex h-auto w-full flex-col bg-white/[.47] shadow-bg backdrop-blur-bg">
            <Navbar />
            <main className="isolate z-10 flex-auto">
              {children}
              <Analytics />
            </main>
            <Footer className="relative z-20" />
          </div>
        </div>
      </body>
    </html>
  );
}

{
  /* <div className="absolute inset-0 h-auto w-full overflow-hidden opacity-[.2]">
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
              fill="#ADEAEB"
            />
            <ellipse
              cx="1078.25"
              cy="667.018"
              rx="578.915"
              ry="883.331"
              fill="#ADB3EB"
            />
            <ellipse
              cx="268.007"
              cy="3035.77"
              rx="486.173"
              ry="722.626"
              fill="#ADEBCB"
            />
            <ellipse
              cx="1096.43"
              cy="2884.38"
              rx="428.083"
              ry="799.011"
              fill="#ADEBB6"
            />
            <ellipse
              cx="699.168"
              cy="1632.22"
              rx="388.683"
              ry="805.958"
              fill="#ADD5EB"
            />
          </svg>
        </div> */
}
