// src/app/components/layout/Footer.tsx

import LogoIconSecondary from '../icons/logo-secondary';
import Container from './Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');

  return (
    // <footer className="mx-auto bg-dark1 px-6">
    <footer className="mt-[4.5rem] bg-dark1">
      <Container
        // className="flex h-[5.375rem] items-center justify-between"
        className="mx-auto flex h-[5.375rem] w-full items-center justify-between"
      >
        <LogoIconSecondary />
        {/* <p>&copy; 2020 Your Company, Inc. All rights reserved.</p> */}
        <p className="font-open-sans text-fs-lg leading-5 text-white">
          copyright {copyrightDate}
        </p>
      </Container>
    </footer>
  );
}
