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
      // { title: 'Privacy Policy', href: '/' },
      { title: 'Contact us', href: '/contact' },
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
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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
                    className="transition hover:text-neutral-950"
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

function OpenSource() {
  return (
    <div className="flex ">
      <div className="max-w-[14rem] ">
        {/* <h3 className="w-fit font-inter text-subtitle text-white"> */}
        <h3 className="w-fit  px-0 text-fs-base text-white">
          Let&apos;s improve it together!
        </h3>
        {/* Check out our Github to join the development! */}
        <p className="mt-2 w-fit  px-0 font-open-sans text-sm text-gray-300 [text-wrap:balance]">
          This is an open source project and we welcome your contributions.
        </p>

        <div className="mt-4 flex items-center justify-center ">
          <GithubIcon className="h-8 w-8 fill-gray-300" />
        </div>
      </div>
    </div>
  );
}

function OpenSource1() {
  return (
    <div className="flex ">
      {/* max-w-[14rem] */}
      <div className="max-w-sm">
        {/* <h3 className="w-fit font-inter text-subtitle text-white"> */}
        <h3 className="max-w-smpx-0 w-fit text-subtitle text-white">
          Let&apos;s improve it together!
        </h3>
        {/* Check out our Github to join the development! */}
        <p className="mt-4 w-fit  px-0 font-open-sans text-sm text-gray-300 [text-wrap:balance]">
          This is an open source project and we welcome your contributions.
        </p>

        <div className="mt-6 flex max-w-[14rem] items-center justify-center ">
          <GithubIcon className="h-10 w-10 fill-white" />
        </div>
      </div>
    </div>
  );
}

function OpenSource2() {
  return (
    <div className="flex items-start ">
      <div className="flex max-w-sm flex-col">
        {/* <h3 className="w-fit font-inter text-subtitle text-white"> */}
        <h3 className="max-w-smpx-0 w-fit text-subtitle text-white">
          Let&apos;s improve it together!
        </h3>

        <div className="mt-4 flex flex-row items-center justify-around gap-3 ">
          <div className="flex h-full  items-center justify-center ">
            <GithubIcon className="h-12 w-12 fill-white" />
          </div>
          <p className=" w-fit  px-0 font-open-sans text-sm text-gray-300 [text-wrap:balance]">
            This project is open source and we welcome your contributions!
          </p>
        </div>
        {/* Check out our Github to join the development! */}
      </div>
    </div>
  );
}

function OpenSource3() {
  return (
    <div className="">
      <div className=" flex w-fit  flex-col ">
        {/* <h3 className="w-fit font-inter text-subtitle text-white"> */}
        <h3 className="text-subtitle text-white">
          Let&apos;s improve it together!
        </h3>

        <div className=" mt-4 flex max-w-xs flex-row items-center  gap-3  ">
          <div className=" ">
            <GithubIcon className="h-12 w-12 fill-white" />
          </div>
          <p className=" font-open-sans text-sm text-gray-300 [text-wrap:balance]">
            This project is open source and we welcome your contributions!
          </p>
        </div>
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
      <Container className="mx-auto ">
        <div className="mt-18 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {/* lg:justify-end */}

          <Navigation />
          <div className=" flex justify-center ">
            <OpenSource3 />
          </div>
        </div>
      </Container>
      {/* <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24"> */}
      {/* border-t border-white/10 */}
      <Container className=" mx-auto mt-24 flex h-[5.375rem] w-full items-center justify-between  ">
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
