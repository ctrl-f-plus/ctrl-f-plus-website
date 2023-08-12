'use client';

import { Dialog } from '@headlessui/react';
// import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { CSSProperties, useRef, useState } from 'react';
import Image from 'next/image';
import ButtonPrimary from '../components/buttons/ButtonPrimary';

function XMarkIcon({ className }: IconProps) {
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

export default function QuickView2() {
  const [isOpen, setIsOpen] = useState(false);
  // const initialFocus = useRef(null);
  const initialRef = useRef(null);

  return (
    <>
      <ButtonPrimary
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        aTag={false}
        target={''}
        className="cursor-pointer"
      >
        See how it works
      </ButtonPrimary>

      <MotionConfig
        transition={{
          ease: 'easeOut',
        }}
      >
        <AnimatePresence initial={false}>
          {isOpen && (
            <Dialog
              as={motion.div}
              initial="closed"
              animate="open"
              exit="closed"
              static
              className="relative z-10"
              open={isOpen}
              onClose={setIsOpen}
              initialFocus={initialRef}
            >
              <motion.div
                variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
                className="fixed inset-0 bg-black/70 bg-opacity-75 backdrop-blur-sm"
              />

              <div className="fixed inset-0 z-10">
                <div className="flex h-full w-full  items-center justify-center p-4">
                  <Dialog.Panel
                    as={motion.div}
                    variants={{
                      closed: {
                        opacity: '0',
                        scale: 0,
                      },
                      open: {
                        opacity: '100',
                        scale: 1,
                      },
                    }}
                    // max-h-[500px]
                    // width="1122"
                    // height="631"

                    // width={1280}
                    // height={853}
                    className="max-w-screen relative flex h-full max-h-screen w-full max-w-[1280px] flex-col shadow-xl"
                  >
                    <div className="flex flex-grow items-center justify-center ">
                      {/* <button
                        type="button"
                        // className="absolute right-0 top-0 z-50 cursor-pointer rounded-full p-4"
                        // className="flex w-full justify-end bg-green-500"
                        className="absolute right-0 top-0 z-50 cursor-pointer hover:bg-gray-500"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="sr-only hover:bg-gray-100 hover:bg-opacity-10">
                          Close
                        </span>
                        <XMarkIcon
                          className="h-4 w-4 hover:bg-gray-100 hover:bg-opacity-10"
                          aria-hidden="true"
                        />
                      </button> */}
                      <button
                        // onClick={closeSearchLayover}
                        onClick={() => setIsOpen(false)}
                        type="button"
                        id="close-layover-btn"
                        // data-testid="close-layover-btn"
                        // active:bg-[#ffffff]
                        className="absolute right-0 top-0 z-50 inline-flex rounded-full p-[2px] text-white hover:bg-gray-500 focus:ring-2 focus:ring-bittersweet active:ring-2 active:ring-bittersweet"
                      >
                        <span className="sr-only">Dismiss</span>
                        <XMarkIcon
                          className="h-[20px] w-[20px] active:text-bittersweet"
                          aria-hidden="true"
                        />
                      </button>
                      <Image
                        ref={initialRef}
                        unoptimized={true}
                        src="https://i.imgur.com/rxhEz0S.gif"
                        alt="Demonstration Video"
                        className="relative object-cover "
                        layout="fill"
                        objectFit="contain"
                        aria-hidden="true"
                        priority
                      />
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
}
