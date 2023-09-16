// app/components/icons/hero-animation.tsx\
'use client';

import gifHero from '@/public/images/gif-hero-animated.webp';
import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import heroAnimationStill from 'public/images/hero-animation-still.png';

export default function HeroAnimation({ className }: any) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {prefersReducedMotion ? (
        <div className="-mt-9 hidden laptop:block">
          <Image
            src={heroAnimationStill}
            alt={'Animated Search Visual'}
            aria-hidden="true"
            // loading="lazy"
            priority
          />
        </div>
      ) : (
        <div className="-mt-18 hidden laptop:block">
          <Image
            height="423"
            width="480"
            unoptimized={true}
            src={gifHero}
            // src="https://res.cloudinary.com/dyy8g76av/image/upload/v1694724152/gif-hero_etecxp.gif"
            // src="https://res.cloudinary.com/dyy8g76av/image/upload/fl_animated/v1694724152/gif-hero_etecxp.webp"
            alt={'Animated Search Visual'}
            aria-hidden="true"
            priority
            // loading="lazy"
          />
        </div>
      )}
    </>
  );
}
