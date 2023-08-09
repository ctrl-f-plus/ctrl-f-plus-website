// app/components/feature.tsx

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Container from './Container';
import { FadeIn } from './fade-in';

interface FeaturePorps {
  feature: any;
  index: number;
}

export default function Feature({ feature, index }: FeaturePorps) {
  const prefersReducedMotion = useReducedMotion();
  // const container = useRef(null);
  // const ref = useRef(null);
  // const isInView = useInView({ root: container });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // const isInView = useInView({
  //   margin: '1000px 0px 0px 0px',
  // });

  const initialXOffset = index % 2 === 1 ? '500' : '-500';

  // const iconVariants = (index: number) => {
  //   // const initialXOffset = index % 2 === 1 ? '500' : '-500';

  //   return {
  //     hidden: { opacity: 0, x: initialXOffset },
  //     visible: {
  //       opacity: 1,
  //       x: 0,
  //       transition: {
  //         // duration: 1.9,
  //       },
  //     },
  //   };
  // };

  return (
    // <FadeIn key={feature.title}>
    //   <section
    //     id="call-to-action"
    //     aria-label="Try the Ctrl-F Chrome Extension today!"
    //     className="mt-18 tablet:mt-24 wide:mt-[7.625rem]"
    //   >
    //     <Container className=" hidden w-full flex-col laptop:flex laptop:flex-row laptop:justify-between">
    //       <FadeIn
    //         className="flex h-full min-h-154 w-full bg-slate-500"
    //         initial="hidden"
    //         whileInView="visible"
    //         viewport={{ once: true }}
    //         variants={{
    //           hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    //           visible: { opacity: 1, y: 0 },
    //         }}
    //         // transition={{ duration: 0.5, when: 'beforeChildren' }}
    //         transition={{ duration: 2, when: 'beforeChildren' }}
    //       >
    //         {/* <div className="laptop:text-left"> */}
    //         {/* <motion.div
    //           variants={{
    //             hidden: {
    //               opacity: 0,
    //               x: prefersReducedMotion ? 0 : initialXOffset,
    //             },
    //             visible: { opacity: 1, x: 0 },
    //           }}
    //           // className={`flex items-center justify-center   ${
    //           //   index % 2 === 1 ? 'laptop:order-last' : ''
    //           // }`}
    //         >
    //           {
    //             <feature.icon className="h-[221.358px] w-[263.2px] laptop:h-[317px] laptop:w-[376px]" />
    //           }
    //         </motion.div> */}

    //         <motion.div
    //           className="w-1/2 bg-red-500"
    //           variants={{
    //             hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    //             visible: { opacity: 1, y: 0 },
    //           }}
    //           // transition={{ duration: 0.5 }}
    //           transition={{ duration: 0.2 }}
    //         >
    //           1
    //         </motion.div>
    //         <motion.div
    //           className="w-1/2 bg-green-500"
    //           variants={{
    //             hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    //             visible: { opacity: 1, y: 0 },
    //           }}
    //           // transition={{ duration: 0.5 }}
    //           transition={{ duration: 0.2 }}
    //         >
    //           2
    //         </motion.div>
    //         {/* </div> */}
    //       </FadeIn>
    //     </Container>
    //   </section>
    // </FadeIn>
    <FadeIn key={feature.title}>
      <section
        ref={ref}
        id="call-to-action"
        aria-label="Try the Ctrl-F Chrome Extension today!"
        className="mt-18 tablet:mt-24 wide:mt-[7.625rem]"
      >
        <Container className="relative mt-18 flex w-full flex-col  tablet:mt-24 wide:mt-[7.625rem]">
          <FadeIn
            // className="min-h-154 bg-red-500"
            // className="h-full w-full"
            className="flex min-h-154 flex-row bg-red-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, when: 'beforeChildren' }}
          >
            {/* <div className="flex h-full w-full flex-row"> */}
            <motion.div
              className="h-full w-1/3 bg-green-500"
              variants={{
                hidden: {
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 24,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  // transition: { when: 'beforeChildren' },
                },
              }}
              transition={{ duration: 2 }}
            >
              2
            </motion.div>
            <motion.div
              className="h-full w-1/3 bg-green-500"
              variants={{
                hidden: {
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 24,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  // transition: { when: 'beforeChildren' },
                  // transition: { duration: 2 },
                },
              }}
              transition={{ duration: 2 }}
            >
              2
            </motion.div>
            {/* </div> */}
          </FadeIn>
          {/* <div ref={ref} className="absolute top-1/2 bg-black">
            testing
          </div> */}
        </Container>
      </section>
    </FadeIn>
  );
}
