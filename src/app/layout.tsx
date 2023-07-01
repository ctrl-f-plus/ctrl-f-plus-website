import { Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';

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
    <html lang="en" className={`${inter.variable} ${open_sans.variable}`}>
      <body className="font-inter">
        <div>
          {/* <Container className="bg-blue-500"> */}
          <Navbar />
          <main className="isolate">{children}</main>
          {/* <main>{children}</main> */}
          {/* </Container> */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
