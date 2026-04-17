'use client';

import { useEffect, useState } from 'react';

/**
 * Replaces framer-motion's useReducedMotion which has a hydration bug
 * in static exports — it captures the SSR value (null) via useState
 * and never updates it on the client.
 *
 * This hook defaults to false (animations enabled) during SSR, then
 * reads the actual preference via useEffect after mount.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
