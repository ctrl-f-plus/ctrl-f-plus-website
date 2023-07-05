// src/app/components/layout/navbar/mobile.tsx

import { Dialog } from '@headlessui/react';
import { useState } from 'react';
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
        <Dialog.Panel className="sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <span className="sr-only">Ctrl-F Plus</span>
              {/* <div className="h-8 w-auto"> */}
              <LogoIcon />
              {/* </div> */}
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item: any) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base -mx-3 block rounded-lg px-3 py-2 font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="text-base -mx-3 block rounded-lg px-3 py-2.5 font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
