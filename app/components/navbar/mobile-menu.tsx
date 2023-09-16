'use client';

import { Dialog } from '@headlessui/react';
// import dynamic from 'next/dynamic';
import { NavItem } from '.';
import CtrlLink from '../ctrl-link';
import XMarkIcon from '../icons/x-mark';
import Image from 'next/image';
// import LogoIcon from '../icons/logo';
// const CtrlLink = dynamic(() => import('../ctrl-link'));
// const LogoIcon = dynamic(() => import('../icons/logo'));
// const XMarkIcon = dynamic(() => import('../icons/x-mark'));

import logoIcon from '/public/svgs/logo-icon.min.svg';

export default function MobileMenu({
  navItems,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  navItems: Record<string, NavItem>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}) {
  return (
    <>
      <Dialog
        as="nav"
        className="lg:hidden"
        open={isMobileMenuOpen}
        onClose={setIsMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-11 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <CtrlLink
              href="/"
              className="-m-1.5 p-1.5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Ctrl-F Plus</span>
              {/* <LogoIcon /> */}
              <Image width="102" height="19" src={logoIcon} alt="Logo Icon" />
            </CtrlLink>

            <button type="button" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {Object.entries(navItems).map(([path, { name, linkTag }]) => {
                  return (
                    // FIXME: Change `aTag` to `Link` if smoothscroll is fixed in future Next.js version
                    <CtrlLink
                      key={path}
                      href={path}
                      target={name === 'Sponsor' ? '_blank' : '_self'}
                      name={name}
                      aTag={linkTag === 'a'}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-shark hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {name}
                    </CtrlLink>
                  );
                })}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
