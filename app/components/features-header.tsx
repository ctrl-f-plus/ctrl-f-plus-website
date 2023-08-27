// app/components/features-header.tsx
'use client';

import clsx from 'clsx';
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useEffect } from 'react';
import Container from './container';
import { FadeIn } from './fade-in';

function CardText({
  prefersReducedMotion,
  topLayer = false,
}: {
  prefersReducedMotion: boolean;
  topLayer?: boolean;
}) {
  const textColor: string =
    topLayer || prefersReducedMotion ? `wide:text-white` : `wide:text-cape-cod`;
  const wideTextColor: string = topLayer
    ? `wide:text-white`
    : `wide:text-cape-cod`;

  return (
    <div className="flex flex-col items-center justify-center gap-9 px-5 py-24 text-center tablet:py-22 wide:py-18 ">
      <h2 className={clsx('font-inter text-fs-base text-white', textColor)}>
        Tab Junkie? Meet Your New Best Friend.
      </h2>

      <h3
        className={clsx(
          'gradient-text animate-gradient-x max-w-[36.125rem] bg-gradient-to-r from-gradient-blue via-gradient-cyan to-gradient-lavender bg-clip-text font-inter text-fs-x0 text-transparent tab-pro:text-fs-xl ',
          !prefersReducedMotion && wideTextColor,
          !prefersReducedMotion &&
            'wide:bg-transparent wide:from-gradient-gray-1 wide:via-gradient-gray-2 wide:to-gradient-gray-2'
        )}
      >
        Your Guiding Light in the Tab Chaos
      </h3>
      <p
        className={clsx(
          'h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white ',
          textColor
        )}
      >
        Tab overload? We&apos;ve got your back. Unearth any word or phrase
        hidden across the depths of your browser tabs.
      </p>
    </div>
  );
}

export default function FeaturesHeader() {
  const prefersReducedMotion = !!useReducedMotion();

  let stiffness = 80;
  let damping = 30;

  let mouseX = useSpring(-500, { stiffness: stiffness, damping: damping });
  let mouseY = useSpring(0, { stiffness: stiffness, damping: damping });

  let maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`;

  let style = { maskImage, WebkitMaskImage: maskImage };

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  useEffect(() => {
    mouseX.set(775);
    mouseY.set(150);
  });

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="features"
        aria-label="Features for multi-tab keyword and phrase search"
        className="mt-18 scroll-mt-12 tablet:mt-24 wide:mt-[7.625rem]"
      >
        <FadeIn>
          <Container className="flex w-full flex-col justify-center">
            <div
              onMouseMove={handleMouseMove}
              className={clsx(
                'group relative rounded-[2.25rem] bg-shark shadow-xl wide:min-h-[584px] ',
                !prefersReducedMotion && 'wide:cursor-magnifying-glass'
              )}
            >
              <div className="items-center justify-center overflow-hidden rounded-[2.25rem] wide:min-h-146">
                <div className="pointer-events-none">
                  {/* Base Layer - Always Visible */}
                  <div
                    className={clsx(
                      'inset-0 flex items-center justify-center rounded-[2.25rem] transition duration-900 wide:absolute',
                      !prefersReducedMotion &&
                        'wide:[mask-image:linear-gradient(white,transparent)] wide:group-hover:opacity-50'
                    )}
                  >
                    <CardText prefersReducedMotion={prefersReducedMotion} />
                  </div>

                  {/* Green Light Layer  */}
                  <m.div
                    className={clsx(
                      'absolute inset-0 hidden rounded-[2.25rem] bg-[#03af7d] opacity-0 transition duration-900 group-hover:opacity-100 wide:block',
                      prefersReducedMotion && 'wide:hidden'
                    )}
                    style={style}
                  />

                  {/* Top Layer / Hover Layer  */}
                  <m.div
                    className={clsx(
                      'opacity-1 absolute inset-0 hidden items-center justify-center rounded-[2.25rem] mix-blend-overlay transition duration-900 group-hover:opacity-100 wide:flex',
                      prefersReducedMotion && 'wide:hidden'
                    )}
                    style={style}
                  >
                    <CardText
                      topLayer
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </m.div>
                </div>
              </div>
            </div>
          </Container>
        </FadeIn>
      </section>
    </LazyMotion>
  );
}
