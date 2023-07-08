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

function ToggleContent({ header, content, isOpen, toggle }) {
  return (
    <motion.div
      layout
      onClick={toggle}
      className="absolute overflow-hidden  border border-white"
    >
      <motion.h2 layout>{header}</motion.h2>
      {isOpen ? content : null}
    </motion.div>
  );
}

// Apply the variants to your components
export default function FramerButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // initial={{ translateX: '-80%', translateY: '-32%' }}
  // animate={{ translateX: '0%', translateY: '0%' }}
  return (
    <>
      {/* <Container> */}
      <div className="relative flex h-96 w-full items-center justify-center bg-green-200 ">
        <div className="absolute h-64 w-64 overflow-hidden bg-blue-500">
          <LayoutGroup>
            <motion.span
              layout
              className="absolute h-64 w-64 -rotate-45 bg-red-500"
              animate={
                isOpen
                  ? {
                      opacity: 1,
                      display: 'block',
                      translateX: '-80%',
                      translateY: '-32%',
                    }
                  : {
                      // opacity: 0,
                      // y: 22,
                      translateX: '0%',
                      translateY: '0%',
                      // transitionEnd: { display: 'none' },
                    }
              }
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            <ToggleContent
              header={'Add to Chrome'}
              content={''}
              isOpen={isOpen}
              toggle={toggle}
            />
          </LayoutGroup>
        </div>
      </div>
      {/* </Container> */}
    </>
  );
}
