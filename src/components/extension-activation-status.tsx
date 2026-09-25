// src/components/extension-activation-status.tsx
'use client';

import { useEffect, useRef } from 'react';

const EXTENSION_DETECTION_TIMEOUT_MS = 5000;

export function ExtensionActivationStatus() {
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const statusElement = statusRef.current;

      if (!statusElement || statusElement.dataset.state !== 'idle') {
        return;
      }

      statusElement.dataset.state = 'noExtension';
      statusElement.textContent =
        'We could not find the Ctrl-F Plus extension in this browser. Install it, then open its Settings and sign in with your email to retrieve your license.';
    }, EXTENSION_DETECTION_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <p ref={statusRef} id="ext-activation" data-state="idle">
      Checking for the Ctrl-F Plus extension…
    </p>
  );
}
