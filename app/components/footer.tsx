// app/components/layout/Footer.tsx

import Link from 'next/link';
import GithubIcon from './icons/github-icon';
import LogoIconSecondary from './icons/logo-secondary';
import Container from './Container';
import { url } from 'inspector';

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
      {
        title: 'Chrome',
        href: new URL(`${process.env.CHROME_STORE_URL}`),
        target: '_blank',
      },
      {
        title: 'string',
        href: 'https://chrome.google.com/webstore/category/extensions',
        target: '_blank',
      },

      {
        title: 'Brave',
        href: 'https://chrome.google.com/webstore/detail/couponbirds-smartcoupon-c/pnedebpjhiaidlbbhmogocmffpdolnek',
        target: '_blank',
      },
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
                    // @ts-ignore
                    href={link.href}
                    // @ts-ignore
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

function OpenSource() {
  return (
    <div className="flex  laptop:justify-end ">
      <div className="flex w-fit flex-col  ">
        <h3 className="text-subtitle text-white [text-wrap:balance]">
          Let&apos;s improve it together!
        </h3>

        <div className="mt-4 flex w-auto flex-row  items-center justify-center gap-3  ">
          <div className=" ">
            <GithubIcon className="h-12 w-12 fill-gray-300" />
          </div>
          <p className="max-w-[14rem] font-open-sans text-sm text-gray-300 [text-wrap:balance]">
            This project is open source and we welcome your contributions!
          </p>
        </div>

        <a
          href={process.env.GITHUB_ORGANIZATION_URL}
          target="_blank"
          className="group mt-6 font-open-sans text-fs-sm text-gray-300 [text-wrap:balance]  laptop:text-center"
        >
          <span className="font-bold group-hover:text-white">github.com/</span>
          <span className="text-fs-base  text-highlight-focus-1 group-hover:text-highlight-focus">
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
      <Container className="">
        <div className="mt-18 grid grid-cols-1 gap-x-8 gap-y-16 tab-pro:grid-cols-2  lg:grid-cols-2">
          <Navigation />

          <OpenSource />
        </div>
      </Container>

      <Container className=" mt-18 flex h-[5.375rem] w-full items-center justify-between border-t border-white/10 tablet:mt-24  ">
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
