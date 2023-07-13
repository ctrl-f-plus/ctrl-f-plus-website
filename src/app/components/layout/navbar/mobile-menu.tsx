// src/app/components/layout/navbar/mobile.tsx

import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import LogoIcon from '../../icons/logo';
import XMarkIcon from '../../icons/x-mark';

export default function MobileMenu({
  navigation,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  navigation: any;
  mobileMenuOpen: any;
  setMobileMenuOpen: (value: boolean) => void;
}) {
  return (
    <>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-11 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Ctrl-F Plus</span>
              <LogoIcon />
            </Link>

            <button type="button" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <ul className="space-y-2 py-6">
                {navigation.map((item: any) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      className="text-base -mx-3 block rounded-lg px-3 py-2 font-semibold leading-7 text-dark1 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
