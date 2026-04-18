// app/components/icons/hero-animation.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function HeroAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      if (window.innerWidth >= 900) {
        // Assuming 1024px as the breakpoint for desktop
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  if (!isDesktop) return null;

  let imageSrc, className;
  if (prefersReducedMotion) {
    imageSrc = '/images/hero-animation-still.png';
    className = '-mt-9';
  } else {
    imageSrc =
      'https://res.cloudinary.com/dyy8g76av/image/upload/f_auto,fl_animated,q_90/v1695149280/gif-hero-animated_pwcfif.webp';
    className = '-mt-18';
  }

  return (
    <div className={className}>
      <Image
        height="423"
        width="480"
        src={imageSrc}
        alt={'Animated Search Visual'}
        aria-hidden="true"
        unoptimized
        priority
      />
    </div>
  );
}
