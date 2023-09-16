// app/components/layout/navbar/index.tsx
'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Container from '../container';
import logoIcon from '/public/svgs/logo-icon.min.svg';
// import MobileMenu from './mobile-menu';
const MobileMenu = dynamic(() => import('./mobile-menu'));
const CtrlLink = dynamic(() => import('../ctrl-link'));
const MenuIcon = dynamic(() => import('../icons/menu'));

export type NavItem = {
  name: string;
  linkTag: 'link' | 'a';
};

const navItems: Record<string, NavItem> = {
  '/': {
    name: 'Home',
    linkTag: 'link',
  },
  '/#features': {
    name: 'Features',
    linkTag: 'a',
  },
  '/blog': {
    name: 'Blog',
    linkTag: 'link',
  },
  '/about': {
    name: 'About',
    linkTag: 'link',
  },
  // [process.env.NEXT_PUBLIC_OPEN_COLLECTIVE_URL]: {
  'https://opencollective.com/ctrl-f-plus-chrome-extension': {
    name: 'Sponsor',
    linkTag: 'a',
  },
};

// TODO: Fix Mobile menu
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
    <header className="pt-5 wide:pt-12 ">
      <Container className=" flex w-full items-center justify-between ">
        <nav
          className="mx-auto flex h-auto w-full items-center justify-between p-2"
          aria-label="Global"
        >
          <CtrlLink href="/" className="">
            <span className="sr-only">Ctrl-F Plus</span>
            <Image
              width="102"
              height="19"
              src={logoIcon}
              alt="Logo Icon"
              unoptimized
            />
            {/* <LogoIcon /> */}
          </CtrlLink>

          <div className="flex laptop:hidden">
            <button type="button" onClick={() => setIsMobileMenuOpen(true)}>
              <span className="sr-only">Open main menu</span>
              <MenuIcon />
            </button>
          </div>

          <div className="hidden laptop:block">
            <div className="flex flex-row font-open-sans text-fs-lg laptop:gap-x-6">
              {Object.entries(navItems).map(([path, { name, linkTag }]) => {
                const isActive = path === pathname;

                return (
                  // FIXME: Change `aTag` to `Link` if smoothscroll is fixed in future Next.js version
                  <CtrlLink
                    key={path}
                    href={path}
                    target={name === 'Sponsor' ? '_blank' : '_self'}
                    className={clsx(
                      'mx-1 text-highlighter-500 transition-all ',
                      {
                        '!text-shark hover:!text-shark/80': !isActive,
                      }
                    )}
                    name={name}
                    aTag={linkTag === 'a'}
                  >
                    <span className="text-fs-lg">{name}</span>
                  </CtrlLink>
                );
              })}
            </div>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <MobileMenu
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            navItems={navItems}
          />
        )}
      </Container>
    </header>
  );
}
