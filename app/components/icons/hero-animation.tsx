// app/components/icons/hero-animation.tsx\
'use client';

import Image from 'next/image';
import gifHero from '@/public/images/gif-hero.gif';
import { useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import heroAnimationStill from 'public/images/hero-animation-still.png';

export default function HeroAnimation({ className }: any) {
  const prefersReducedMotion = useReducedMotion();

  const classNames = twMerge(
    className,
    prefersReducedMotion ? '-mt-9' : '-mt-18'
  );

  return (
    <div className={classNames}>
      {prefersReducedMotion ? (
        <Image
          src={heroAnimationStill}
          alt={'Animated Search Visual'}
          aria-hidden="true"
          loading="lazy"
        />
      ) : (
        <Image
          // unoptimized={true}
          src={gifHero}
          alt={'Animated Search Visual'}
          aria-hidden="true"
          // priority
          loading="lazy"
        />
      )}
    </div>
  );
}
