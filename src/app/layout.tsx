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
      className={`${inter.variable} ${open_sans.variable} scroll-smooth antialiased`}
    >
      <body className="debug-screens mx-auto ">
        <svg
          // width="1440"
          // height="3759"
          viewBox="0 0 1440 3759"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-[.2]"
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
        <div className="bg-white/[.47] shadow-bg backdrop-blur-[158.26499938964844px]">
          <Navbar />
          {/* **** */}
          <main className="isolate flex h-full flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

{
  /* <svg
  // width="1440"
  // height="3759"
  viewBox="0 0 1440 3759"
  preserveAspectRatio="xMidYMid meet"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="absolute inset-0 "
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
</svg> */
}

// bg-light-purple
// bg-light-blue/[.01]
// bg-white/[.43] shadow-bg backdrop-blur-[158.26499938964844px]
// bg-white shadow-bg backdrop-blur-[158.26499938964844px]
