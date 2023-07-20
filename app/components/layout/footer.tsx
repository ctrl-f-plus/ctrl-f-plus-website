// app/components/layout/Footer.tsx

import LogoIconSecondary from '../icons/logo-secondary';
import Container from './Container';

/**
 *
 * footer navigation:
 *
 * Download:
 *  - Chrome
 *  - Brave
 *  - Firefox
 *  - Edge
 *
 * Contribute:
 *  - Open Source
 *  - Sponsor
 *
 * Some Header
 *  - Features
 *  - Blog
 *  - Our Team
 *
 * Company:
 *  - Contact
 *  - Blog
 *  - About
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');

  return (
    <footer className="mt-18 bg-dark1 tablet:mt-24 wide:mt-[7.625rem]">
      <Container className="mx-auto flex h-[5.375rem] w-full items-center justify-between">
        <LogoIconSecondary />
        {/* <p>&copy; 2020 Your Company, Inc. All rights reserved.</p> */}
        <p className="font-open-sans text-fs-lg leading-5 text-white">
          copyright {copyrightDate}
        </p>
      </Container>
    </footer>
  );
}
