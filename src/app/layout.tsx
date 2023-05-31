import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import './globals.css';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ctrl-F Advanced',
  description: 'CTRL-F Advance - Chrome Extension',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className="bg-white"> */}
        <div>
          {/* <Container className="bg-blue-500"> */}
          {/* <Navbar /> */}
          <main className="isolate">{children}</main>
          {/* </Container> */}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
