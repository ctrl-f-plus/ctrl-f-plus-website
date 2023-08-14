'use client';

import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import LogoIcon from '../icons/logo';
import XMarkIcon from '../icons/x-mark';
import CtrlLink from '../ctrl-link';
import { NavItem } from '.';

export default function MobileMenu({
  navItems,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  navItems: Record<string, NavItem>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}) {
  return (
    <>
      <Dialog
        as="nav"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-11 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <CtrlLink
              href="/"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Ctrl-F Plus</span>
              <LogoIcon />
            </CtrlLink>

            <button type="button" onClick={() => setMobileMenuOpen(false)}>
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
                      onClick={() => setMobileMenuOpen(false)}
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
