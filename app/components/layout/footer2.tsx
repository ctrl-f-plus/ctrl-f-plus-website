// app/components/layout/Footer.tsx

import Link from 'next/link';
import LogoIconSecondary from '../icons/logo-secondary';
import Container from './Container';
import { socialMediaProfiles, SocialMedia } from '@/app/components/SocialMedia';
import LogoIcon from '../icons/logo';
import GithubIcon from '../icons/github-icon';

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

const navigation = [
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Blog', href: '/blog' },
      { title: 'Privacy Policy', href: '/' },
      { title: 'Contact us', href: 'mailto:ben.m.chavez@gmail.com' },
    ],
  },
  {
    title: 'Contribute',
    links: [
      {
        title: 'Open Source',
        href: process.env.GITHUB_EXT_URL,
        target: '_blank',
      },
      {
        title: 'Sponsor',
        href: process.env.OPEN_COLLECTIVE_URL,
        target: '_blank',
      },
    ],
  },

  {
    title: 'Download',
    links: [
      { title: 'Chrome', href: process.env.CHROME_STORE_URL, target: '_blank' },
      { title: 'Brave', href: process.env.CHROME_STORE_URL, target: '_blank' },
    ],
  },
];

function Navigation() {
  return (
    <nav>
      <ul
        role="list"
        className=" grid grid-cols-2 gap-x-8 gap-y-10  laptop:grid-cols-3"
      >
        {navigation.map((section) => (
          <li key={section.title}>
            {/* text-sm font-semibold tracking-wider text-white */}
            <div className="font-inter text-fs-base text-white">
              {section.title}
            </div>

            <ul
              role="list"
              // mt-4
              className="mt-4 font-open-sans text-fs-sm text-gray-300"
            >
              {section.links.map((link) => (
                // mt-4
                <li key={link.title} className="mt-2">
                  <Link
                    href={link.href}
                    target={link.target ?? '_self'}
                    className=" hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function OpenSource3() {
  return (
    // <div className="">
    <div className="flex  laptop:justify-end ">
      <div className="flex w-fit flex-col  ">
        <h3 className="text-subtitle text-white [text-wrap:balance]">
          Let&apos;s improve it together!
        </h3>

        <div className="mt-4 flex w-auto flex-row  items-center justify-center gap-3  ">
          <div className=" ">
            <GithubIcon className="h-12 w-12 fill-white" />
          </div>
          <p className="max-w-[14rem] font-open-sans text-sm text-gray-300 [text-wrap:balance]">
            This project is open source and we welcome your contributions!
          </p>
        </div>

        <a
          href={process.env.GITHUB_ORGANIZATION_URL}
          target="_blank"
          className="mt-6 font-open-sans text-fs-sm text-gray-300 [text-wrap:balance] laptop:text-center"
        >
          github.com/
          <span className="text-fs-base text-highlight-focus-1">
            ctrl-f-plus
          </span>
        </a>
        {/* Check out our Github to join the development! */}
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');

  // "mx-auto mt-18 tablet:mt-24 wide:mt-[7.625rem]
  return (
    <footer className="mt-18 bg-dark1 tablet:mt-24 wide:mt-[7.625rem]">
      <Container className="mx-auto">
        <div className="mt-18 grid grid-cols-1 gap-x-8 gap-y-16 tab-pro:grid-cols-2  lg:grid-cols-2">
          <Navigation />

          <OpenSource3 />
        </div>
      </Container>

      <Container className="mx-auto mt-18 flex h-[5.375rem] w-full items-center justify-between border-t border-white/10 tablet:mt-24  ">
        <LogoIconSecondary />

        {/* <p className="font-open-sans text-fs-lg leading-5 text-white">
          &copy; {copyrightDate}
        </p> */}
        <p className="font-open-sans text-fs-lg leading-5 text-white">
          copyright {copyrightDate}
        </p>
      </Container>
    </footer>
  );
}
