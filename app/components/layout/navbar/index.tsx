'use client';
// app/components/layout/navbar/index.tsx

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoIcon from '../../icons/logo';
import MenuIcon from '../../icons/menu';
import Container from '../Container';
import MobileMenu from './mobile-menu';

const navigation = [
  { name: 'Features', path: '/#features-header' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Sponsor', path: '#' },
];

const navItems = {
  '/': {
    name: 'Home',
  },
  '/#features-header': {
    name: 'Features',
  },
  '/blog': {
    name: 'Blog',
  },
  '/about': {
    name: 'About',
  },
  'https://opencollective.com/ctrl-f-plus-chrome-extension': {
    name: 'Sponsor',
  },
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// TODO: Fix Mobile menu
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  // http: return (
  return (
    // mb-18  tablet:mb-24 wide:mb-[7.625rem]
    <header className="pt-5  wide:pt-12 ">
      <Container className="mx-auto flex w-full items-center justify-between ">
        <nav
          // scroll-pr-6 fade
          className="mx-auto flex h-auto w-full items-center justify-between p-2"
          aria-label="Global"
        >
          {/* -m-1.5 p-1.5 */}
          {/* Link??? */}
          <Link href="/" className="">
            <span className="sr-only">Ctrl-F Plus</span>
            <LogoIcon />
          </Link>

          <div className="flex laptop:hidden">
            <button
              type="button"
              // className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon />
            </button>
          </div>

          {/* TODO: change `a` tag to link if scroll is fixed */}
          <div className="hidden laptop:block">
            <div
              // className="flex flex-row space-x-6"
              className="flex flex-row font-open-sans text-fs-lg laptop:gap-x-6"
            >
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;

                return (
                  <Link
                    key={path}
                    href={path}
                    target={name === 'Sponsor' ? '_blank' : '_self'}
                    className={clsx(' mx-1 text-primary2 transition-all ', {
                      '!text-dark1 hover:!text-dark1/80': !isActive,
                    })}
                  >
                    <span className="text-dark-1 text-fs-lg">{name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          navigation={navigation}
        />
      </Container>
    </header>
  );
}

//  <Container className="mx-auto flex w-full items-center justify-between ">
//    <nav
//      className="mx-auto flex h-auto w-full items-center justify-between p-2"
//      aria-label="Global"
//    >
//      {/* -m-1.5 p-1.5 */}
//      <Link href="/" className="">
//        <span className="sr-only">Ctrl-F Plus</span>
//        <LogoIcon />
//      </Link>

//      <div className="flex laptop:hidden">
//        <button
//          type="button"
//          // className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//          onClick={() => setMobileMenuOpen(true)}
//        >
//          <span className="sr-only">Open main menu</span>
//          {/* <Bars2Icon className="h-6 w-6" aria-hidden="true" /> */}
//          <MenuIcon />
//          {/* <XMarkIcon className="bg-[#0C3440]" /> */}
//        </button>
//      </div>

//      {/* TODO: change `a` tag to link if scroll is fixed */}
//      <div className="hidden laptop:block">
//        {navigation.length ? (
//          <ul className="flex flex-row font-open-sans text-fs-lg laptop:gap-x-6">
//            {navigation.map((item) => (
//              <li key={item.path}>
//                <a href={item.path} className="text-dark-1 px-4 text-fs-lg">
//                  {item.name}
//                </a>
//              </li>
//            ))}
//          </ul>
//        ) : null}
//      </div>
//    </nav>
//    <MobileMenu
//      mobileMenuOpen={mobileMenuOpen}
//      setMobileMenuOpen={setMobileMenuOpen}
//      navigation={navigation}
//    />
//  </Container>;
