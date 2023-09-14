// app/components/icons/hero-animation.tsx\
'use client';

import Image from 'next/image';
// import gifHero from '@/public/images/gif-hero.gif';
import { useReducedMotion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import heroAnimationStill from 'public/images/hero-animation-still.png';
// import { CldImage } from 'next-cloudinary';

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
          // loading="lazy"
          priority
        />
      ) : (
        <>
          <Image
            height="480"
            width="423"
            // unoptimized={true}
            // src={gifHero}
            // src="https://res.cloudinary.com/dyy8g76av/image/upload/v1694724152/gif-hero_etecxp.gif"
            src="https://res.cloudinary.com/dyy8g76av/image/upload/fl_animated/v1694724152/gif-hero_etecxp.webp"
            alt={'Animated Search Visual'}
            aria-hidden="true"
            priority
            // loading="lazy"
          />
        </>
      )}
    </div>
  );
}
