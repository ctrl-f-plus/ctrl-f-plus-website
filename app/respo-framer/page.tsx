'use client';

import { Dialog } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { CSSProperties, useState } from 'react';
import Image from 'next/image';
import ButtonPrimary from '../components/buttons/ButtonPrimary';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mt-8">
        <ButtonPrimary
          // onClick={() => setIsOpen(true)}
          onClick={() => setOpen(!open)}
          variant="outline"
          aTag={false}
          target={''}
          className="cursor-pointer"
        >
          See how it works
        </ButtonPrimary>
      </div>

      <MotionConfig
        transition={{ type: 'spring', bounce: 0.3, duration: open ? 0.7 : 0.4 }}
      >
        <AnimatePresence initial={false}>
          {open && (
            <Dialog
              as={motion.div}
              initial="closed"
              animate="open"
              exit="closed"
              static
              className="relative z-10"
              open={open}
              onClose={setOpen}
            >
              <motion.div
                variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
                className="fixed inset-0 bg-black/70 bg-opacity-75 backdrop-blur-sm"
                // className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
              />

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Dialog.Panel
                    as={motion.div}
                    variants={{
                      closed: {
                        // opacity: 'var(--opacity-from',
                        // scale: 'var(--scale-from, 1)',
                        // y: 'var(--y-from, 0px)',
                      },
                      open: {
                        // opacity: 'var(--opacity-to',
                        // scale: 'var(--scale-to, 1)',
                        // y: 'var(--y-to, 0px)',
                      },
                    }}
                    // laptop:[--opacity-to:100%] laptop:[--scale-from:100%] [--y-from:500px] max-sm:[--y-to:-500px] laptop:[--opacity-from:0%] laptop:[--scale-to:10%]
                    // px-4 pb-4 pt-5 rounded-lg bg-white sm:max-w-lg sm:p-6 sm:my-8 sm:w-full text-left
                    className="
                       relative overflow-hidden bg-red-500 shadow-xl   "
                  >
                    {/* <div
                      // sm:flex sm:items-start
                      className=""
                    > */}
                    <Image
                      unoptimized={true}
                      src="https://i.imgur.com/rxhEz0S.gif"
                      // src="https://i.imgur.com/sdfrxhEz0S.gif"
                      alt="Demonstration Video"
                      // width="1122"
                      // height="631"
                      width={1280}
                      height={853}
                      aria-hidden="true"
                      priority
                    />
                    {/* </div> */}
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
