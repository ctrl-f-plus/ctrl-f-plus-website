'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Gradient colors - soft pastel palette
const GRADIENT_COLORS = [
  '#f5fbff', // gradient-blue
  '#dde3ee', // gradient-slate
  '#f2effb', // gradient-lavender
  '#d4ece5', // gradient-cyan
];

export default function AnimatedGradientBg() {
  const prefersReducedMotion = useReducedMotion();
  const gradientRef = useRef<{ conf?: { playing: boolean } } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Skip WebGL animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }

    let isMounted = true;

    const initGradient = async () => {
      try {
        const { Gradient } = await import('@/app/lib/gradient');

        if (!isMounted) return;

        const gradient = new Gradient();
        // Pass colors directly to avoid CSS variable timing issues
        gradient.initGradient('#gradient-canvas', {
          colors: GRADIENT_COLORS,
        });
        gradientRef.current = gradient;

        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to initialize gradient:', error);
        setIsLoaded(true);
      }
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => initGradient(), { timeout: 2000 });
      return () => {
        isMounted = false;
        cancelIdleCallback(idleId);
        if (gradientRef.current?.conf) {
          gradientRef.current.conf.playing = false;
        }
      };
    } else {
      const timeoutId = setTimeout(initGradient, 100);
      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
        if (gradientRef.current?.conf) {
          gradientRef.current.conf.playing = false;
        }
      };
    }
  }, [prefersReducedMotion]);

  // Handle visibility changes to pause animation when tab is hidden
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleVisibilityChange = () => {
      if (gradientRef.current?.conf) {
        gradientRef.current.conf.playing = !document.hidden;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  // For reduced motion, show a static CSS gradient instead
  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-br from-gradient-blue via-gradient-lavender to-gradient-cyan"
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <canvas
        id="gradient-canvas"
        className={`fixed inset-0 -z-10 h-full w-full transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      {/* Fallback gradient shown while loading */}
      {!isLoaded && (
        <div
          className="fixed inset-0 -z-10 bg-gradient-to-br from-gradient-blue via-gradient-lavender to-gradient-cyan"
          aria-hidden="true"
        />
      )}
    </>
  );
}
