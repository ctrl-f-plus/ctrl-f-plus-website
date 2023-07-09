// // src/app/components/FramerButton.tsx

// import { Variants, motion } from 'framer-motion';
// import { useState } from 'react';
// import Container from './layout/Container';

// export default function FramerButton() {
//   const [active, setActive] = useState(false);

//   const rectangle: Variants = {
//     active: { background: '#ff00b1', rotate: 90 },
//     disabled: { background: '#0D00FF', rotate: 0 },
//   };
//   return (
//     <Container className="flex h-20 w-full items-center justify-center bg-red-500">
//       <div className="relative">
//         <motion.div
//           className="absolute h-20 w-20 p-2 text-white"
//           variants={rectangle}
//           animate={active ? 'active' : 'disabled'}
//           onClick={() => setActive(!active)}
//         >
//           <div className="invisible absolute p-2">Click me!</div>
//         </motion.div>
//         <div className="absolute  p-2">Click me!</div>
//       </div>
//     </Container>
//   );
// }

import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import Container from './layout/Container';

// Define your animation variants
const variants = {
  open: {
    opacity: 1,
    x: 0,
  },
  closed: {
    opacity: 0,
    x: '-100%',
  },
};

// Apply the variants to your components
export default function FramerButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Container className="grid grid-cols-2 bg-slate-500">
        <div className="flex items-center justify-center">
          <a
            href="#_"
            // overflow-hidden
            className="group relative inline-block inline-flex items-center justify-start rounded-full px-5 py-3 font-bold"
          >
            {/* <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-white opacity-[3%]"></span> */}

            <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-white opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>

            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
              Button Text
            </span>

            <span className="absolute inset-0 rounded-full border-2 border-white"></span>
          </a>
        </div>

        <div className="relative flex h-96 w-full items-center justify-center  bg-green-200">
          <button
            // href=""
            // className="rounded-full bg-slate-500 px-5 py-3"
            className="group relative inline-block inline-flex items-center  justify-start overflow-hidden rounded-full bg-slate-800 px-5 py-3 font-bold"
          >
            <LayoutGroup>
              <motion.span
                layout
                className="absolute -top-16 left-0  h-48 w-48 bg-red-500 "
                style={{
                  // rotate: -45,
                  rotate: -68.566,
                  //  translateY: '-25%'
                }}
                // initial={{ rotate: -68.566, translateY: '-25%' }}
                animate={
                  isOpen
                    ? {
                        translateX: '-110%',
                      }
                    : {
                        translateX: '0%',
                        // transitionEnd: {
                        //   translateY: '-25%',
                        // },
                      }
                }
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />

              <motion.div
                layout
                onClick={toggle}
                className="relative w-full text-center text-white "
              >
                {/* <motion.h2 layout>{'Add to Chrome'}</motion.h2> */}
                Add to Chrome
              </motion.div>
              {/* <motion.span
                layout
                className="absolute inset-0 rounded-full border-2 border-white"
              /> */}
            </LayoutGroup>
          </button>
        </div>
      </Container>
    </>
  );
}
