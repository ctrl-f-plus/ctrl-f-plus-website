// app/components/quick-view.tsx
'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Loading from '../loading';
import Button from './Button';

function XMarkIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function QuickView() {
  const playerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        intent="outline"
        size="thin"
        icon="play"
        animation="slice"
        onClick={() => setIsOpen(true)}
        aTag={false}
        target={''}
        button={true}
        className="cursor-pointer"
      >
        See how it works
      </Button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <div className="relative z-50 flex aspect-[3/2] w-full items-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/70 bg-opacity-75 backdrop-blur-sm transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <Dialog.Panel className="relative flex transform flex-col transition">
                    <div className="mt-2 h-full w-full overflow-hidden">
                      <div className="relative flex aspect-video h-full w-full items-center justify-center">
                        <div className="flex h-full w-full ">
                          <div className="relative flex  w-screen max-w-screen-xl flex-col items-center justify-center">
                            <div className="mb-2 ml-2 flex w-[85%]  flex-col items-end pt-2">
                              <button
                                onClick={() => setIsOpen(false)}
                                type="button"
                                id="close-layover-btn"
                                className="z-50 inline-flex rounded-full p-[2px] text-white hover:bg-gray-500 focus:ring-2 focus:ring-bittersweet active:ring-2 active:ring-bittersweet"
                              >
                                <span className="sr-only">Dismiss</span>
                                <XMarkIcon
                                  className="h-[20px] w-[20px] active:text-bittersweet"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>

                            <ReactPlayer
                              ref={playerRef}
                              url="https://www.youtube.com/embed/2uBnJsjbHdo?si=xyHg5VTPP4cFOHDT"
                              controls
                              className="aspect-video h-full w-full"
                              width="85%"
                              height="auto"
                              fallback={<Loading />}
                              priority
                              afterInteractive
                            />
                          </div>
                        </div>
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
