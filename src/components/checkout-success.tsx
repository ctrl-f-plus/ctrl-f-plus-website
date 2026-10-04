// src/components/checkout-success.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import CopyButton from '@/components/copy-button';
import { FadeInStagger } from '@/components/fade-in';
import { InfoCard } from '@/components/info-card';
import { CheckIcon } from '@/components/icons/check-icon';
import { DoubleCheckIcon } from '@/components/icons/double-check-icon';
import { BrowserLabel, InstallButton } from '@/components/install-button';

const EXTENSION_DETECTION_TIMEOUT_MS = 5000;

function ExtensionActivationStatus() {
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const statusElement = statusRef.current;

      if (statusElement?.dataset.state !== 'idle') {
        return;
      }

      statusElement.dataset.state = 'noExtension';
      statusElement.textContent =
        'We could not find the Ctrl-F Plus extension in this browser. ' +
        'Install it, then open its Settings and sign in with your email to retrieve your license.';
    }, EXTENSION_DETECTION_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl border border-highlighter-focus-200 bg-highlighter-focus-50 px-5 py-2 font-inter text-label text-shark tablet:flex-row tablet:gap-3">
      <span className="flex flex-none items-center gap-3">
        <DoubleCheckIcon className="h-5 w-5 text-highlighter-900" />
        Ctrl-F Plus Pro
      </span>
      <span
        aria-hidden="true"
        className="hidden h-5 w-px flex-none bg-shark/10 tablet:block"
      />
      <p
        ref={statusRef}
        id="ext-activation"
        data-state="idle"
        className="text-center tablet:text-left"
      >
        Checking for the Ctrl-F Plus extension…
      </p>
    </div>
  );
}

function SuccessCheckBadge() {
  return (
    <div
      aria-hidden="true"
      className="rounded-full bg-highlighter-focus-100/60 p-2.5"
    >
      <div className="flex h-18 w-18 items-center justify-center rounded-full bg-highlighter-focus-100">
        <CheckIcon className="h-10 w-10 stroke-2 text-highlighter-900" />
      </div>
    </div>
  );
}

export function CheckoutSuccess() {
  const checkoutId = useSearchParams().get('checkout_id');
  // const checkoutId = 'd612aeaa-f1c0-4067-9e20-ce783cb7717d';

  return (
    <div data-checkout-id={checkoutId ?? undefined}>
      <FadeInStagger>
        <InfoCard className="mt-0">
          <SuccessCheckBadge />

          <div className="flex flex-col items-center gap-4">
            <h1 className="font-inter text-sm font-semibold uppercase tracking-widest text-shark">
              Purchase successful
            </h1>

            <h2 className="z-10 text-center font-inter text-fs-xxx text-shark mobile-md:text-fs-xl">
              You&apos;re officially a{' '}
              <span className="-ml-2 rounded-2xl bg-highlighter-focus px-2 mobile-md:-mx-2">
                Pro.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-center font-open-sans text-fs-lg text-shark-400 [text-wrap:balance]">
            Less searching. More finding. A whole lot of tabs. Thanks for taking
            Ctrl-F Plus to the next level.
          </p>

          <ExtensionActivationStatus />

          <div className="flex flex-col items-center gap-4">
            <div className="w-72">
              <InstallButton intent="solid" size="thin" icon="puzzle">
                Add to <BrowserLabel /> for free
              </InstallButton>
            </div>
            <p className="font-open-sans text-fs-lg-sm text-shark-400">
              A few clicks. Then back to your tabs.
            </p>
          </div>

          {checkoutId && (
            <div className="mt-4 flex items-center gap-2 font-arimo text-footnote tabular-nums text-shark-400">
              <span className="text-caption-gray">Order</span>
              <span>{checkoutId}</span>
              <CopyButton
                text={checkoutId}
                isTitle
                label="Copy order reference"
              />
            </div>
          )}
        </InfoCard>
      </FadeInStagger>
    </div>
  );
}
