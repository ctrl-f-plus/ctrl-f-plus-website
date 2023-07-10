import { useEffect, useState } from 'react';

export default function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  // Initialize state with undefined.
  const [matches, setMatches] = useState<boolean | undefined>();

  useEffect(() => {
    // Set initial value once we are on the client (this code runs only on the client).
    setMatches(getMatches(query));

    const matchMedia = window.matchMedia(query);
    const handleChange = () => {
      setMatches(getMatches(query));
    };

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return !!matches; // Return false instead of undefined if matches is not set yet.
}
