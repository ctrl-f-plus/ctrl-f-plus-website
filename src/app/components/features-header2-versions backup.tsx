// src/app/components/features-header.tsx

'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import Container from './layout/Container';

// TODO: Add aria-hidden to the radial-gradient?
export default function FeaturesHeader2() {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const mouseX2 = useMotionValue(0);
  const mouseY2 = useMotionValue(0);

  console.log(`render`);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX2.set(clientX - left - width / 2);
    mouseY2.set(clientY - top - height / 2);

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const WebkitMaskPosition = useMotionTemplate`${mouseX2}px ${mouseY2}px`;
  return (
    <>
      <Container
        id="feature-header"
        // TODO: check if you need justify-center here
        className="relative mx-auto flex w-full flex-col justify-center "
      >
        <div
          onMouseMove={handleMouseMove}
          className="group rounded-[2.25rem] border border-gray-700 bg-dark1  shadow-xl"
        >
          <div onMouseMove={handleMouseMove}>
            <motion.div
              className="pointer-events-none absolute -inset-px hidden rounded-[2.25rem] opacity-0 transition  duration-300 group-hover:opacity-100 sm:block"
              style={{
                background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(3, 175, 125, .90) 0%, transparent 50%)`,
              }}
            />
            <motion.div
              className="h-full w-full rounded-[2.25rem]"
              style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                // overflow: 'hidden',
                // width: '100vw',
                // height: '100vh',

                // borderRadius: '50%',

                WebkitMaskPosition,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskImage:
                  'radial-gradient(300px circle, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4), transparent)',
              }}
            >
              <div className="flex flex-col items-center justify-center gap-9 px-5 py-[4.5rem] text-center">
                <h2 className="font-inter text-fs-base text-white ">
                  Tab Junkie? Meet Your New Best Friend.
                </h2>
                <motion.h3 className="gradient-text max-w-[36.125rem] animate-gradient-x bg-gradient-to-r from-[#0021CD] via-[#F9F9F9] to-[#8CFFFF] bg-clip-text font-inter text-fs-x0 text-transparent  tablet:text-fs-xl">
                  {'Your Guiding Light in the Tab Chaos'
                    .split('')
                    .map((char, index) => (
                      <motion.span key={char + '-' + index}>{char}</motion.span>
                    ))}
                </motion.h3>
                <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white ">
                  Tab overload? We&apos;ve got your back. Unearth any word or
                  phrase hidden in the depths of your browser.
                </p>
              </div>
              {/* </div> */}
            </motion.div>
          </div>
        </div>
      </Container>
    </>
  );
}
// src/app/components/features-header.tsx

// 'use client';

// import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
// import Container from './layout/Container';

// // TODO: Add aria-hidden to the radial-gradient?
// export default function FeaturesHeader() {
//   let mouseX = useMotionValue(0);
//   let mouseY = useMotionValue(0);

//   console.log(`render`);

//   function handleMouseMove({
//     currentTarget,
//     clientX,
//     clientY,
//   }: React.MouseEvent<HTMLDivElement>) {
//     let { left, top } = currentTarget.getBoundingClientRect();

//     mouseX.set(clientX - left);
//     mouseY.set(clientY - top);
//   }

//   return (
//     <>
//       <Container
//         id="feature-header"
//         className="mx-auto flex w-full flex-col justify-center"
//       >
//         <div
//           onMouseMove={handleMouseMove}
//           className="group relative rounded-[2.25rem] border border-gray-700 bg-dark1 shadow-xl"
//         >
//           <motion.div
//             className="pointer-events-none absolute -inset-px hidden rounded-[2.25rem] opacity-0 transition  duration-100 group-hover:opacity-100 sm:block"
//             style={{
//               background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(3, 175, 125, .90) 0%, transparent 50%)`,
//             }}
//           />
//           {/* invisible */}
//           <div className=" flex flex-col items-center justify-center gap-9 px-5 py-[4.5rem] text-center  ">
//             <h2 className="font-inter text-fs-base text-white ">
//               Tab Junkie? Meet Your New Best Friend.
//             </h2>
//             <motion.h3 className="gradient-text max-w-[36.125rem] animate-gradient-x bg-gradient-to-r from-[#0021CD] via-[#F9F9F9] to-[#8CFFFF] bg-clip-text font-inter text-fs-x0 text-transparent  tablet:text-fs-xl">
//               {'Your Guiding Light in the Tab Chaos'
//                 .split('')
//                 .map((char, index) => (
//                   <motion.span key={char + '-' + index}>{char}</motion.span>
//                 ))}
//             </motion.h3>
//             <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white ">
//               Tab overload? We&apos;ve got your back. Unearth any word or phrase
//               hidden in the depths of your browser.
//             </p>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }

// // src/app/components/features-header.tsx

// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import {
//   motion,
//   useMotionTemplate,
//   useMotionValue,
//   useTransform,
// } from 'framer-motion';
// import Container from './layout/Container';

// export default function FeaturesHeader() {
//   let mouseX = useMotionValue(0);
//   let mouseY = useMotionValue(0);
//   let divRef = useRef<HTMLDivElement>(null);
//   // let [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

//   // useEffect(() => {
//   //   setWindowSize({ width: window.innerWidth, height: window.innerHeight });

//   //   function handleResize() {
//   //     setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//   //   }

//   //   window.addEventListener('resize', handleResize);
//   //   return () => {
//   //     window.removeEventListener('resize', handleResize);
//   //   };
//   // }, []);

//   // let centerMouseX = useTransform(mouseX, (x) => x - windowSize.width / 2);
//   // let centerMouseY = useTransform(mouseY, (y) => y - windowSize.height / 2);

//   let centerMouseX = useTransform(mouseX, (x) => {
//     if (!divRef.current) return 0;
//     return x - divRef.current.offsetWidth / 2;
//   });
//   let centerMouseY = useTransform(mouseY, (y) => {
//     if (!divRef.current) return 0;
//     return y - divRef.current.offsetHeight / 2;
//   });

//   let webkitMaskPosition = useMotionTemplate`${centerMouseX}px ${centerMouseY}px`;

//   function handleMouseMove({
//     currentTarget,
//     clientX,
//     clientY,
//   }: React.MouseEvent<HTMLDivElement>) {
//     let { left, top } = currentTarget.getBoundingClientRect();

//     mouseX.set(clientX - left);
//     mouseY.set(clientY - top);
//     console.log(mouseX, mouseY);
//   }

//   return (
//     <>
//       <Container
//         id="feature-header"
//         className="mx-auto flex w-full flex-col justify-center"
//       >
//         <div
//           onMouseMove={handleMouseMove}
//           className="group relative overflow-hidden rounded-[2.25rem] border border-gray-700 bg-dark1 shadow-xl"
//         >
//           <motion.div
//             // absolute hidden
//             className="pointer-events-none  -inset-px  h-full w-full  rounded-[2.25rem]  opacity-0 transition duration-100 group-hover:opacity-100 sm:block"
//             style={{
//               WebkitMaskRepeat: 'no-repeat',
//               WebkitMaskImage:
//                 'radial-gradient(300px 300px, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4), transparent)',
//               WebkitMaskPosition: webkitMaskPosition,
//             }}
//           >
//             {/* invisible */}
//             <div className=" flex flex-col items-center justify-center gap-9 px-5 py-[4.5rem] text-center  ">
//               <h2 className="font-inter text-fs-base text-white ">
//                 Tab Junkie? Meet Your New Best Friend.
//               </h2>
//               <motion.h3 className="gradient-text max-w-[36.125rem] animate-gradient-x bg-gradient-to-r from-[#0021CD] via-[#F9F9F9] to-[#8CFFFF] bg-clip-text font-inter text-fs-x0 text-transparent  tablet:text-fs-xl">
//                 {'Your Guiding Light in the Tab Chaos'
//                   .split('')
//                   .map((char, index) => (
//                     <motion.span key={char + '-' + index}>{char}</motion.span>
//                   ))}
//               </motion.h3>
//               <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white ">
//                 Tab overload? We&apos;ve got your back. Unearth any word or
//                 phrase hidden in the depths of your browser.
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </Container>
//     </>
//   );
// }

// 'use client';

// import { useEffect, useRef } from 'react';
// import {
//   motion,
//   useMotionTemplate,
//   useMotionValue,
//   useTransform,
// } from 'framer-motion';
// import Container from './layout/Container';

// export default function FeaturesHeader() {
//   let mouseX = useMotionValue(0);
//   let mouseY = useMotionValue(0);

//   let divRef = useRef<HTMLDivElement>(null);

//   let centerMouseX = useTransform(mouseX, (x) => {
//     if (!divRef.current) return 0;
//     return x - divRef.current.offsetWidth / 2;
//   });
//   let centerMouseY = useTransform(mouseY, (y) => {
//     if (!divRef.current) return 0;
//     return y - divRef.current.offsetHeight / 2;
//   });

//   let webkitMaskPosition = useMotionTemplate`${centerMouseX}px ${centerMouseY}px`;

//   function handleMouseMove({
//     currentTarget,
//     clientX,
//     clientY,
//   }: React.MouseEvent<HTMLDivElement>) {
//     let { left, top } = currentTarget.getBoundingClientRect();
//     mouseX.set(clientX - left);
//     mouseY.set(clientY - top);
//   }

//   return (
//     <>
//       <Container
//         id="feature-header"
//         className="mx-auto flex w-full flex-col justify-center"
//       >
//         <div
//           onMouseMove={handleMouseMove}
//           className="group relative overflow-hidden rounded-[2.25rem] border border-gray-700 bg-dark1 shadow-xl"
//         >
//           <motion.div
//             ref={divRef}
//             // absolute hidden
//             className="pointer-events-none  -inset-px  h-full w-full  rounded-[2.25rem]  bg-red-500 opacity-0 transition duration-100 group-hover:opacity-100 sm:block"
//             style={{
//               WebkitMaskRepeat: 'no-repeat',
//               WebkitMaskImage:
//                 'radial-gradient(300px 300px, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4), transparent)',
//               WebkitMaskPosition: webkitMaskPosition,
//             }}
//           >
//             {/* invisible */}
//             <div className=" flex flex-col items-center justify-center gap-9 px-5 py-[4.5rem] text-center  ">
//               <h2 className="font-inter text-fs-base text-white ">
//                 Tab Junkie? Meet Your New Best Friend.
//               </h2>
//               <motion.h3 className="gradient-text max-w-[36.125rem] animate-gradient-x bg-gradient-to-r from-[#0021CD] via-[#F9F9F9] to-[#8CFFFF] bg-clip-text font-inter text-fs-x0 text-transparent  tablet:text-fs-xl">
//                 {'Your Guiding Light in the Tab Chaos'
//                   .split('')
//                   .map((char, index) => (
//                     <motion.span key={char + '-' + index}>{char}</motion.span>
//                   ))}
//               </motion.h3>
//               <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white ">
//                 Tab overload? We&apos;ve got your back. Unearth any word or
//                 phrase hidden in the depths of your browser.
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </Container>
//     </>
//   );
// }

// 'use client';

// import { useEffect, useRef } from 'react';
// import {
//   motion,
//   useMotionTemplate,
//   useMotionValue,
//   useTransform,
// } from 'framer-motion';
// import Container from './layout/Container';

// export default function FeaturesHeader() {
//   let mouseX = useMotionValue(0);
//   let mouseY = useMotionValue(0);

//   let divRef = useRef<HTMLDivElement>(null);

//   let centerMouseX = useTransform(mouseX, (x) => {
//     if (!divRef.current) return 0;
//     return x - divRef.current.offsetWidth / 2;
//   });
//   let centerMouseY = useTransform(mouseY, (y) => {
//     if (!divRef.current) return 0;
//     return y - divRef.current.offsetHeight / 2;
//   });

//   let webkitMaskPosition = useMotionTemplate`${centerMouseX}px ${centerMouseY}px`;

//   function handleMouseMove({
//     currentTarget,
//     clientX,
//     clientY,
//   }: React.MouseEvent<HTMLDivElement>) {
//     let { left, top } = currentTarget.getBoundingClientRect();
//     mouseX.set(clientX - left);
//     mouseY.set(clientY - top);
//   }

//   return (
//     <>
//       <Container
//         id="feature-header"
//         className="mx-auto flex w-full flex-col justify-center"
//       >
//         <div
//           onMouseMove={handleMouseMove}
//           // border border-gray-700
//           className="group relative rounded-[2.25rem] bg-dark1 shadow-xl backdrop-blur-lg  backdrop-opacity-90"
//         >
//           <div
//             className=" relative max-h-[554px] overflow-hidden rounded-[2.25rem]"
//             // style={{ padding: '50px', margin: '-50px' }}
//           >
//             <motion.div
//               ref={divRef}
//               // absolute hidden
//               className="opacity-1 duration-900 pointer-events-none  -inset-px hidden h-[20000px] rounded-[2.25rem] bg-[#03AF7D] p-20 file:group-hover:opacity-100 wide:block"
//               style={{
//                 WebkitMaskRepeat: 'no-repeat',
//                 WebkitMaskImage:
//                   'radial-gradient(250px 250px, rgba(0, 0, 0, 1),  transparent)',

//                 WebkitMaskPosition: webkitMaskPosition,
//               }}
//             >
//               {/* invisible */}
//               <div className=" flex flex-col items-center justify-center gap-9 px-5 py-[4.5rem] text-center  ">
//                 <h2 className="font-inter text-fs-base text-white ">
//                   Tab Junkie? Meet Your New Best Friend.
//                 </h2>
//                 <motion.h3 className="gradient-text max-w-[36.125rem] animate-gradient-x bg-gradient-to-r from-[#0021CD] via-[#F9F9F9] to-[#8CFFFF] bg-clip-text font-inter text-fs-x0 text-transparent  tablet:text-fs-xl">
//                   {'Your Guiding Light in the Tab Chaos'
//                     .split('')
//                     .map((char, index) => (
//                       <motion.span key={char + '-' + index}>{char}</motion.span>
//                     ))}
//                 </motion.h3>
//                 <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white ">
//                   Tab overload? We&apos;ve got your back. Unearth any word or
//                   phrase hidden in the depths of your browser.
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }
