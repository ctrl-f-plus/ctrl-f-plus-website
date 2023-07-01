'use client';
// src/app/components/layout/navbar/index.tsx

import LogoIcon from '../../icons/logo';
import Container from '../Container';
import { Dialog } from '@headlessui/react';
import { Bars2Icon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { JSX, SVGProps, useState } from 'react';
import MobileMenu from './mobile-menu';
import MenuIcon from '../../icons/menu';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// TODO: Fix Mobile menu
// TODO: Fix spacing
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="">
      {/* <Container className={''}>
        <LogoIcon />
      </Container> */}
      <nav
        className="lg:px-8 mx-auto flex max-w-7xl items-center justify-between p-6"
        aria-label="Global"
      >
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Ctrl-F Plus</span>
          {/* <div className="h-8 w-auto"> */}
          <LogoIcon />
          {/* </div> */}
        </a>
        <div className="flex laptop:hidden">
          <button
            type="button"
            // className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            {/* <Bars2Icon className="h-6 w-6" aria-hidden="true" /> */}
            <MenuIcon />
          </button>
        </div>
        <div className="lg:flex lg:gap-x-12 hidden">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigation={navigation}
      />
    </header>
  );
}
