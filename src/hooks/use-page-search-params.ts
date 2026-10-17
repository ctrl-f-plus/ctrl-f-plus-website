// src/hooks/use-page-search-params.ts
'use client';

import { useMemo, useSyncExternalStore } from 'react';

const SERVER_SEARCH = '';

function subscribeToLocation(onLocationChange: () => void): () => void {
  window.addEventListener('popstate', onLocationChange);
  return () => window.removeEventListener('popstate', onLocationChange);
}

function readLocationSearch(): string {
  return window.location.search;
}

function readServerSearch(): string {
  return SERVER_SEARCH;
}

// next/navigation's useSearchParams would drop the pricing cards out of the
// static HTML up to a Suspense boundary; an empty server snapshot keeps them in.
export function usePageSearchParams(): URLSearchParams {
  const locationSearch = useSyncExternalStore(
    subscribeToLocation,
    readLocationSearch,
    readServerSearch,
  );

  return useMemo(() => new URLSearchParams(locationSearch), [locationSearch]);
}
