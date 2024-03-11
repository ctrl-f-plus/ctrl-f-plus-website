// app/tab-hoarders/components/FeatureCard.tsx
'use client';
// TODO: I temporarily removed reduced motion functionality on these cards. Add it back.

import {
  useInView,
  // useReducedMotion
  useReducedMotion,
} from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Container from './ui/container';
import { FadeIn } from './fade-in';
// import dynamic from 'next/dynamic';
// const FeatureIcon1 = dynamic(() => import('./icons/feature1'));
// const FeatureIcon2 = dynamic(() => import('./icons/feature2'));
// const FeatureIcon3 = dynamic(() => import('./icons/feature3'));

// const FeatureIcon1 = dynamic(() => import('./icons/minimized/feature1'));
// const FeatureIcon2 = dynamic(() => import('./icons/minimized/feature2'));
// const FeatureIcon3 = dynamic(() => import('./icons/minimized/feature3'));

import feature1 from '/public/svgs/feature1.min.svg';
import feature2 from '/public/svgs/feature2.min.svg';
import feature3 from '/public/svgs/feature3.min.svg';

const features = [
  {
    title: `All-Tab Search: The Panoramic View`,
    subTitle: `Upgrade from One-Tab Searches`,
    description: `Your CTRL+F only searches one tab? That's cute. We prefer the panoramic view.`,
    // icon: FeatureIcon1,
    icon: feature1,
    initialOfset: '-500px',
  },
  {
    title: `Familiar Interface: Revolutionary Yet Comfortable`,
    subTitle: `Innovation with Coziness`,
    description: `Just because we've revolutionized search doesn't mean we can't be cozy. Slip into something comfortable.`,
    // icon: FeatureIcon2,
    icon: feature2,
    initialOfset: '500px',
  },
  {
    title: `Easy Activation: CTRL+SHIFT+F`,
    subTitle: `Simplicity at Your Fingertips`,
    description: `CTRL+SHIFT+F. So easy a caveman could do it. But don't worry, you'll probably get the hang of it too.`,
    // icon: FeatureIcon3,
    icon: feature3,
    initialOfset: '-500px',
  },
];
// TODO: pass as param instead
// const calculateInitialOffset = (index: number): string => {
//   return index % 2 === 1 ? '500px' : '-500px';
// };

function AnimateCard({ feat, index }: { feat: any; index: number }) {
  let prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <>
      <div className="absolute top-1/3" ref={ref} />

      <div
        className=" flex min-h-154 items-center justify-center overflow-hidden rounded-[2.25rem] bg-white tablet:p-9 tab-pro:p-14 laptop:min-h-146 laptop:p-16 desktop:p-20 wide:p-24"
        style={{
          // transform:
          //   isInView || prefersReducedMotion ? 'none' : 'translateY(24px)',
          transform: isInView ? 'none' : 'translateY(24px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 1.3s',
        }}
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-9 laptop:flex-row">
            <div
              className={`flex items-center justify-center   ${
                index % 2 === 1 ? 'laptop:order-last' : ''
              }`}
            >
              <span
                className="block"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView
                    ? 'none'
                    : `translateX(${feat.initialOfset})`,
                  // transform:
                  //   isInView || prefersReducedMotion
                  //     ? 'none'
                  //     : `translateX(${feat.initialOfset})`,
                  //// : `translateX(${calculateInitialOffset(index)})`,
                  transition: 'all 1.9s',
                }}
              >
                {
                  <>
                    <div className="relative h-[221.358px] w-[263.2px] laptop:h-[317px] laptop:w-[376px]">
                      <Image
                        fill
                        aria-hidden="true"
                        alt=""
                        src={feat.icon}
                        // unoptimized
                        priority
                      />
                    </div>
                    {/* <div className="h-[221.358px] w-[263.2px] laptop:h-[317px] laptop:w-[376px]">
                      <feat.icon className="h-[221.358px] w-[263.2px] laptop:h-[317px] laptop:w-[376px]" />
                    </div> */}
                  </>
                }
              </span>
            </div>

            <div
              className={`flex w-full  ${
                index % 2 === 1 ? '' : 'laptop:justify-end'
              } `}
            >
              <span
                className="block"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'none' : 'translateY(500px)',

                  // transform:
                  //   isInView || prefersReducedMotion
                  //     ? 'none'
                  //     : 'translateY(500px)',
                  transition: 'all 1.9s',
                }}
              >
                <div className="flex w-fit flex-col items-center justify-center gap-9 px-1 mobile-md:px-0 laptop:items-start">
                  <h2 className="text-center font-inter text-fs-base text-highlighter-900 [text-wrap:balance] laptop:text-left">
                    {feat.title}
                  </h2>

                  <h3 className="max-w-[305px] text-center font-inter text-fs-x0 text-shark tablet:max-w-[525px] tab-pro:text-fs-xl laptop:max-w-[521px] laptop:text-left">
                    {feat.subTitle}
                  </h3>

                  <p className="max-w-[19rem] text-center font-open-sans text-fs-lg text-shark [text-wrap:balance] tablet:max-w-[23.6875rem] laptop:max-w-[491px] laptop:text-left">
                    {feat.description}
                  </p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function FeatureCard() {
  return (
    <>
      {features.map((feat, index) => {
        return (
          <FadeIn key={feat.title} className="">
            <Container className="relative mt-18 flex w-full flex-col tablet:mt-24 wide:mt-[7.625rem]">
              <div className="laptop:text-left">
                <AnimateCard feat={feat} index={index} />
              </div>
            </Container>
          </FadeIn>
        );
      })}
    </>
  );
}
