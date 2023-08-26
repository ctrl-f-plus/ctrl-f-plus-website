// app/components/quick-view.tsx
'use client';

import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import Button from './buttons/Button';
import ReactPlayer from 'react-player';

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
  const initialFocusRef = useRef(null);

  return (
    <>
      <Button
        variant="outline"
        size="thin"
        icon="play"
        animation="slice"
        onClick={() => setIsOpen(true)}
        aTag={false}
        target={''}
        className="cursor-pointer"
      >
        See how it works
      </Button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setIsOpen}
          initialFocus={initialFocusRef}
          // initialFocus={}
        >
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
                    {/* <div className="flex justify-end ">
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
                    </div> */}
                    <div className="mt-2 h-full w-full overflow-hidden">
                      <div className="relative flex aspect-video h-full w-full items-center justify-center">
                        <div className="flex h-full w-full ">
                          {/* <Image
                            ref={initialRef}
                            unoptimized={true}
                            src="https://i.imgur.com/rxhEz0S.gif"
                            alt="Demonstration Video"
                            // width="1122"
                            // height="631"
                            className="aspect-video"
                            width={1280}
                            height={853}
                            aria-hidden="true"
                            priority
                          /> */}
                          {/* <iframe src="https://www.youtube.com/..."></iframe> */}
                          {/* <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/2uBnJsjbHdo?si=xyHg5VTPP4cFOHDT"
                            title="YouTube video player"
                            frameborder="0"
                            className=" aspect-video w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          ></iframe> */}

                          <div
                            //  h-[663px] w-[1179px]
                            className="relative flex h-auto w-screen flex-col items-center justify-center overflow-hidden shadow-2xl shadow-blue-500"
                          >
                            <div className="mb-2 ml-2   flex w-[85%] flex-col items-end">
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
                            <span className="hidden" />
                            <ReactPlayer
                              ref={playerRef}
                              url="https://www.youtube.com/embed/2uBnJsjbHdo?si=xyHg5VTPP4cFOHDT"
                              controls
                              className="aspect-video h-full w-full"
                              width="85%"
                              height="auto"
                              // tabIndex={-1}

                              // frameborder="0"

                              // width="1179"
                              // height="663"
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
