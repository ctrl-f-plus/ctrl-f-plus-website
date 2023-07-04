'use client';
// src/app/components/layout/navbar/index.tsx

import LogoIcon from '../../icons/logo';
import Container from '../Container';
import { Dialog } from '@headlessui/react';
import { Bars2Icon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { JSX, SVGProps, useState } from 'react';
import MobileMenu from './mobile-menu';
import MenuIcon from '../../icons/menu';
import Link from 'next/link';

const navigation = [
  { name: 'Features', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '#' },
  { name: 'Donate', path: '#' },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// TODO: Fix Mobile menu
// TODO: Fix spacing
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  http: return (
    // TODO: maybe put this inside of a container instead of setting padding
    // px-8
    <header className="mb-[4.5rem] pt-2">
      <Container className={''}>
        {/* <LogoIcon /> */}

        <nav
          className="mx-auto flex max-w-7xl items-center justify-between py-2 "
          aria-label="Global"
        >
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Ctrl-F Plus</span>
            {/* <div className="h-8 w-auto"> */}
            <LogoIcon />
            {/* </div> */}
          </Link>
          <div className="flex laptop:hidden">
            <button
              type="button"
              // className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              {/* <Bars2Icon className="h-6 w-6" aria-hidden="true" /> */}
              <MenuIcon />
              {/* <XMarkIcon className="bg-[#0C3440]" /> */}
            </button>
          </div>

          <div className="hidden laptop:block">
            {navigation.length ? (
              <ul className="flex flex-row font-open-sans text-fs-lg laptop:gap-x-6">
                {navigation.map((item) => (
                  <li key={item.path}>
                    <Link href={item.path} className="text-dark-1 text-fs-lg">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
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
