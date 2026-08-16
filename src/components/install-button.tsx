// src/components/install-button.tsx
'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';
import Button from '@/components/ui/Button';
import { Browser, BROWSERS } from '@/lib/browsers';

const BrowserContext = createContext<Browser>('chrome');

function detectBrowser(): Browser {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Firefox/')) return 'firefox';
  return 'chrome';
}

function subscribe() {
  return () => {};
}

export function BrowserLabel() {
  const browser = useContext(BrowserContext);
  return BROWSERS[browser].displayName;
}

type InstallButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'aTag' | 'button' | 'href' | 'rel' | 'target'
>;

export function InstallButton({
  children,
  ...buttonProps
}: Readonly<InstallButtonProps>) {
  const browser = useSyncExternalStore<Browser>(
    subscribe,
    detectBrowser,
    () => 'chrome',
  );

  return (
    <BrowserContext.Provider value={browser}>
      <Button
        {...buttonProps}
        href={BROWSERS[browser].storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aTag
      >
        {children}
      </Button>
    </BrowserContext.Provider>
  );
}
