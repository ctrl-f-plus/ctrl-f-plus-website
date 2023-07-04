import { Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import TestComponent from './components/test-component';
import HeroAnimation from './components/icons/hero-animation';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const open_sans = Open_Sans({
  subsets: ['latin'],
  // display: 'swap',
  variable: '--font-open-sans',
});

export const metadata = {
  title: 'Ctrl-F Plus',
  description: 'CTRL-F Plus - Chrome Extension',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // h-full
      className={`${inter.variable} ${open_sans.variable}  antialiased`}
    >
      {/* <TestComponent /> */}
      {/* <div className="flex h-full w-full items-start bg-green-800 laptop:block">
        <HeroAnimation className="bg-blue-300 pt-0 laptop:block" />
      </div> */}
      <body
        // px-4
        // bg-yellow-300
        // tablet:bg-gray-100
        // laptop:bg-indigo-500
        // max-w-7xl
        className="mx-auto bg-gray-100"
        // className="flex h-full flex-col "
      >
        <Navbar />
        <main className="isolate flex h-full flex-col ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
