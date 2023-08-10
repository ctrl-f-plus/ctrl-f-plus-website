// app/components/quick-view.tsx
'use client';
// @ts-nocheck

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import ButtonPrimary from './buttons/ButtonPrimary';

export default function QuickView() {
  // const playerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ButtonPrimary
        onClick={() => setIsOpen(true)}
        variant="outline"
        aTag={false}
        target={''}
        className="cursor-pointer"
      >
        See how it works
      </ButtonPrimary>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Dialog.Overlay
            // ref={overlayRef}
            as={motion.div}
            key="backdrop"
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
          />
          <div className="xl:taller-than-854:h-auto relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4 ">
                {/*FIXME: This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden md:inline-block md:h-screen md:align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <Dialog.Panel className="relative flex  transform flex-col transition">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg- w-fit"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="w-full overflow-hidden">
                      <div className="relative flex aspect-[3/2] items-center justify-center">
                        <div className="absolute"></div>
                        <Image
                          unoptimized={true}
                          src="https://i.imgur.com/rxhEz0S.gif"
                          alt="Demonstration Video"
                          // width="1122"
                          // height="631"
                          width={1920}
                          height={1280}
                          aria-hidden="true"
                          priority
                        />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

{
  /* <div
                    // className="flex items-center overflow-hidden shadow-2xl"
                    // style={{ width: '80vw', height: '80vh' }}
                    // className="flex h-full w-full items-center overflow-hidden shadow-2xl"
                    className="flex h-[663px] w-[1179px] items-center overflow-hidden shadow-2xl"
                  >
                    <ReactPlayer
                      ref={playerRef}
                      url="https://www.youtube.com/embed/RssoEj2mci0"
                      playing
                      controls
                      className="aspect-video "
                      width="100%"
                      height="100%"

                      // width="1179"
                      // height="663"
                    />
                  </div> */
}
