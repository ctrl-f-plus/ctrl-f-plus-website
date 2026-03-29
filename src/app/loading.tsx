// app/loading.tsx

'use client';

import { useReducedMotion } from 'framer-motion';
import Container from './components/ui/container';

function Loading() {
  const prefersReducedMotion = useReducedMotion();

  return prefersReducedMotion ? (
    <></>
  ) : (
    <Container className="flex h-full w-full items-center justify-center ">
      <div
        className="flex h-full w-full items-center justify-center"
        aria-live="polite"
      >
        <div className="relative h-24 w-24 animate-spin rounded-full bg-gradient-to-r from-gradient-cyan via-highlighter-focus-400 to-gradient-lavender ">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-[#F4FAF8]"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </Container>
  );
}

export default Loading;
