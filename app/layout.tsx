import { Inter, Open_Sans, Arimo } from 'next/font/google';
import CanvasGradient from './components/canvas-gradient';
import Footer from './components/layout/footer';
import Navbar from './components/layout/navbar';
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
      className={`${inter.variable} ${open_sans.variable} ${arimo.variable} h-full scroll-smooth  antialiased`}
    >
      <body className="debug-screens mx-auto flex min-h-full flex-col">
        <div className="relative flex flex-auto ">
          <CanvasGradient />
          <div
            className="flex h-auto w-full flex-col bg-white/[.47] shadow-bg backdrop-blur-bg"
            // className="flex h-auto w-full flex-col "
          >
            <Navbar />

            <main
              className="isolate flex-auto"
              // className="flex-auto isolate flex flex-col"
            >
              {children}
            </main>
            <Footer />
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
