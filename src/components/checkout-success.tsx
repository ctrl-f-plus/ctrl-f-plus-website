// src/components/checkout-success.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CopyButton from '@/components/copy-button';
import { FadeInStagger } from '@/components/fade-in';
import { InfoCard } from '@/components/info-card';
import { CheckIcon } from '@/components/icons/check-icon';
import { DoubleCheckIcon } from '@/components/icons/double-check-icon';
import { BrowserLabel, InstallButton } from '@/components/install-button';
import Button from '@/components/ui/Button';

const EXTENSION_DETECTION_TIMEOUT_MS = 5000;
const OPEN_SETTINGS_TIMEOUT_MS = 5000;
const OPEN_SETTINGS_FAILURE_TEXT =
  'Could not open Settings. Reload this page and try again.';

const CHECKOUT_BRIDGE_MESSAGE_TYPE = {
  READY: 'ctrl-f-plus:checkout:ready',
  REQUEST: 'ctrl-f-plus:checkout:request',
  STATUS: 'ctrl-f-plus:checkout:status',
  OPEN_SETTINGS: 'ctrl-f-plus:checkout:open-settings',
  OPEN_SETTINGS_RESULT: 'ctrl-f-plus:checkout:open-settings-result',
} as const;

const CHECKOUT_STATUS_STATES = new Set([
  'checking',
  'activated',
  'alreadyActivated',
  'seatClaimFailed',
  'licenseLocked',
  'failed',
]);

const PENDING_ACTIVATION_STATES = new Set(['idle', 'checking']);

const SETTINGS_BUTTON_LABELS_BY_STATE = new Map([
  ['alreadyActivated', 'Open Settings'],
  ['seatClaimFailed', 'Retry in Settings'],
  ['licenseLocked', 'See why in Settings'],
  ['failed', 'Sign in from Settings'],
]);

function ExtensionActivationStatus({
  checkoutId,
}: Readonly<{ checkoutId: string | null }>) {
  const [activationStatus, setActivationStatus] = useState(() =>
    checkoutId
      ? {
          state: 'idle',
          text: 'Checking for the Ctrl-F Plus extension…',
          canOpenSettings: false,
        }
      : {
          state: 'missingCheckout',
          text: 'This link has no checkout reference. Open the extension’s Settings and sign in with your purchase email.',
          canOpenSettings: false,
        },
  );
  const [isOpeningSettings, setIsOpeningSettings] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const settingsRequestIdRef = useRef<string | null>(null);
  const settingsTimeoutIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!checkoutId) return;

    const requestId = crypto.randomUUID();
    let receivedStatus = false;
    let receivedFinalStatus = false;

    function requestCheckoutStatus(): void {
      window.postMessage(
        {
          type: CHECKOUT_BRIDGE_MESSAGE_TYPE.REQUEST,
          checkoutId,
          requestId,
        },
        location.origin,
      );
    }

    const detectionTimeoutId = window.setTimeout(() => {
      if (receivedStatus) return;
      setActivationStatus({
        state: 'noExtension',
        text: 'Could not connect to Ctrl-F Plus. Check that it is enabled in this browser, then reload this page.',
        canOpenSettings: false,
      });
    }, EXTENSION_DETECTION_TIMEOUT_MS);

    function handleCheckoutMessage(event: MessageEvent<unknown>): void {
      if (event.source !== window || event.origin !== location.origin) return;

      const messageData = event.data;
      if (
        typeof messageData !== 'object' ||
        messageData === null ||
        !('type' in messageData)
      ) {
        return;
      }

      if (messageData.type === CHECKOUT_BRIDGE_MESSAGE_TYPE.READY) {
        if (!receivedStatus) requestCheckoutStatus();
        return;
      }

      if (
        messageData.type === CHECKOUT_BRIDGE_MESSAGE_TYPE.OPEN_SETTINGS_RESULT
      ) {
        if (
          !('checkoutId' in messageData) ||
          messageData.checkoutId !== checkoutId ||
          !('requestId' in messageData) ||
          typeof messageData.requestId !== 'string' ||
          messageData.requestId !== settingsRequestIdRef.current ||
          !('success' in messageData) ||
          typeof messageData.success !== 'boolean'
        ) {
          return;
        }

        window.clearTimeout(settingsTimeoutIdRef.current);
        settingsTimeoutIdRef.current = undefined;
        settingsRequestIdRef.current = null;
        setIsOpeningSettings(false);
        setSettingsError(
          messageData.success ? null : OPEN_SETTINGS_FAILURE_TEXT,
        );
        return;
      }

      if (
        receivedFinalStatus ||
        messageData.type !== CHECKOUT_BRIDGE_MESSAGE_TYPE.STATUS ||
        !('requestId' in messageData) ||
        messageData.requestId !== requestId ||
        !('checkoutId' in messageData) ||
        messageData.checkoutId !== checkoutId ||
        !('state' in messageData) ||
        typeof messageData.state !== 'string' ||
        !CHECKOUT_STATUS_STATES.has(messageData.state) ||
        !('text' in messageData) ||
        typeof messageData.text !== 'string'
      ) {
        return;
      }

      receivedStatus = true;
      receivedFinalStatus = messageData.state !== 'checking';
      window.clearTimeout(detectionTimeoutId);
      setActivationStatus({
        state: messageData.state,
        text: messageData.text,
        canOpenSettings:
          'canOpenSettings' in messageData &&
          messageData.canOpenSettings === true,
      });
    }

    window.addEventListener('message', handleCheckoutMessage);
    requestCheckoutStatus();

    return () => {
      window.removeEventListener('message', handleCheckoutMessage);
      window.clearTimeout(detectionTimeoutId);
      window.clearTimeout(settingsTimeoutIdRef.current);
      settingsTimeoutIdRef.current = undefined;
      settingsRequestIdRef.current = null;
    };
  }, [checkoutId]);

  function openSettings(): void {
    if (
      !checkoutId ||
      !activationStatus.canOpenSettings ||
      settingsRequestIdRef.current !== null
    ) {
      return;
    }

    const requestId = crypto.randomUUID();
    settingsRequestIdRef.current = requestId;
    setIsOpeningSettings(true);
    setSettingsError(null);

    settingsTimeoutIdRef.current = window.setTimeout(() => {
      settingsTimeoutIdRef.current = undefined;
      settingsRequestIdRef.current = null;
      setIsOpeningSettings(false);
      setSettingsError(OPEN_SETTINGS_FAILURE_TEXT);
    }, OPEN_SETTINGS_TIMEOUT_MS);

    window.postMessage(
      {
        type: CHECKOUT_BRIDGE_MESSAGE_TYPE.OPEN_SETTINGS,
        checkoutId,
        requestId,
      },
      location.origin,
    );
  }

  const isActivationPending = PENDING_ACTIVATION_STATES.has(
    activationStatus.state,
  );
  const settingsButtonLabel = activationStatus.canOpenSettings
    ? SETTINGS_BUTTON_LABELS_BY_STATE.get(activationStatus.state)
    : undefined;
  const isInstallButtonShown = activationStatus.state === 'noExtension';
  const isShortcutHintShown = activationStatus.state === 'activated';

  return (
    <>
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
          id="ext-activation"
          data-state={activationStatus.state}
          className="text-center tablet:text-left"
        >
          {activationStatus.text}
        </p>
      </div>

      {isActivationPending && <div className="h-14" />}

      {settingsButtonLabel && (
        <div className="flex w-72 flex-col items-center gap-2">
          <Button
            intent="solid"
            size="thin"
            type="button"
            target=""
            onClick={openSettings}
            aria-busy={isOpeningSettings}
          >
            {settingsButtonLabel}
          </Button>
          {settingsError && (
            <p role="alert" className="text-center font-inter text-sm">
              {settingsError}
            </p>
          )}
        </div>
      )}

      {isInstallButtonShown && (
        <div className="w-72">
          <InstallButton intent="solid" size="thin" icon="puzzle">
            Add to <BrowserLabel />
          </InstallButton>
        </div>
      )}

      {isShortcutHintShown && (
        <p className="font-open-sans text-fs-lg-sm text-shark-400">
          Press Ctrl+Shift+F in any tab to start.
        </p>
      )}
    </>
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

  return (
    <div data-checkout-id={checkoutId ?? undefined}>
      <FadeInStagger>
        <InfoCard className="mt-0">
          {/*<SuccessCheckBadge />*/}

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

          <ExtensionActivationStatus
            key={checkoutId ?? 'missing'}
            checkoutId={checkoutId}
          />

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
