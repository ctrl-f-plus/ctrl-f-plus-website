// visual-baseline/checkout-success.spec.ts

import { expect, test, type Page } from '@playwright/test';

const CHECKOUT_ID = '00000000-0000-4000-8000-000000000001';
const SUCCESS_PATH = '/success/';
const CHECKOUT_SUCCESS_PATH = `${SUCCESS_PATH}?checkout_id=${CHECKOUT_ID}`;
const STATUS_SELECTOR = '#ext-activation';
const DETECTION_TIMEOUT_MS = 5000;
const STORED_LICENSE_STATUS = {
  state: 'alreadyActivated',
  text: "This device already has a license saved. Open the extension's Settings to manage it.",
};
const PURCHASE_HEADING = 'Purchase successful';
const PENDING_HEADING = 'Setting up Pro…';
const PRO_HEADING = "You're officially a Pro.";
const NEXT_STEP_HEADING = 'One more step.';
const MISSING_CHECKOUT_HEADING = 'Sign in to finish setup.';

function installCheckoutBridgeStub(
  checkoutStatus: typeof STORED_LICENSE_STATUS,
): void {
  const messageTypes = {
    READY: 'ctrl-f-plus:checkout:ready',
    REQUEST: 'ctrl-f-plus:checkout:request',
    STATUS: 'ctrl-f-plus:checkout:status',
  };

  window.addEventListener('message', (event: MessageEvent<unknown>) => {
    if (event.source !== window || event.origin !== location.origin) return;

    const messageData = event.data;
    if (
      typeof messageData !== 'object' ||
      messageData === null ||
      !('type' in messageData) ||
      messageData.type !== messageTypes.REQUEST ||
      !('requestId' in messageData) ||
      typeof messageData.requestId !== 'string' ||
      !('checkoutId' in messageData) ||
      typeof messageData.checkoutId !== 'string'
    ) {
      return;
    }

    window.postMessage(
      {
        type: messageTypes.STATUS,
        checkoutId: messageData.checkoutId,
        requestId: messageData.requestId,
        ...checkoutStatus,
      },
      location.origin,
    );
  });

  window.postMessage({ type: messageTypes.READY }, location.origin);
}

function headingNamed(page: Page, headingName: string) {
  return page.getByRole('heading', { name: headingName, exact: true });
}

test.describe('Checkout success page', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/^https?:\/\//, (route) => {
      const hostname = new URL(route.request().url()).hostname;
      return hostname === 'localhost' || hostname === '127.0.0.1'
        ? route.continue()
        : route.abort();
    });
  });

  test('an extension ready before React mounts reports the saved license after hydration', async ({
    page,
  }) => {
    const pageErrorMessages: string[] = [];
    page.on('pageerror', (error) => {
      pageErrorMessages.push(error.message);
    });
    await page.clock.install();
    await page.addInitScript(installCheckoutBridgeStub, STORED_LICENSE_STATUS);

    await page.goto(CHECKOUT_SUCCESS_PATH);

    const statusElement = page.locator(STATUS_SELECTOR);
    await expect(statusElement).toHaveAttribute(
      'data-state',
      STORED_LICENSE_STATUS.state,
    );
    await expect(statusElement).toHaveText(STORED_LICENSE_STATUS.text);
    await expect(page.getByText(CHECKOUT_ID, { exact: true })).toBeVisible();

    await page.clock.fastForward(DETECTION_TIMEOUT_MS + 1);

    await expect(statusElement).toHaveAttribute(
      'data-state',
      STORED_LICENSE_STATUS.state,
    );
    expect(pageErrorMessages).toEqual([]);
  });

  test('an extension ready after React mounts reports the saved license', async ({
    page,
  }) => {
    await page.goto(CHECKOUT_SUCCESS_PATH);
    await expect(page.locator(STATUS_SELECTOR)).toHaveAttribute(
      'data-state',
      'idle',
    );

    await page.evaluate(installCheckoutBridgeStub, STORED_LICENSE_STATUS);

    await expect(page.locator(STATUS_SELECTOR)).toHaveText(
      STORED_LICENSE_STATUS.text,
    );
  });

  test('an extension arriving after the detection timeout replaces the connection warning', async ({
    page,
  }) => {
    await page.goto(CHECKOUT_SUCCESS_PATH);
    await expect(page.locator(STATUS_SELECTOR)).toHaveAttribute(
      'data-state',
      'idle',
    );

    await expect(page.locator(STATUS_SELECTOR)).toHaveAttribute(
      'data-state',
      'noExtension',
      { timeout: DETECTION_TIMEOUT_MS * 2 },
    );

    await page.evaluate(installCheckoutBridgeStub, STORED_LICENSE_STATUS);

    await expect(page.locator(STATUS_SELECTOR)).toHaveText(
      STORED_LICENSE_STATUS.text,
    );
  });

  test('a missing checkout reference shows recovery instructions without an order number', async ({
    page,
  }) => {
    await page.goto(SUCCESS_PATH);

    await expect(page.locator(STATUS_SELECTOR)).toHaveAttribute(
      'data-state',
      'missingCheckout',
    );
    await expect(page.locator(STATUS_SELECTOR)).toContainText(
      'This link has no checkout reference.',
    );
    await expect(page.locator('[data-checkout-id]')).toHaveCount(0);
  });

  test('a page still waiting on the extension shows the setup line and not the Pro line', async ({
    page,
  }) => {
    await page.goto(CHECKOUT_SUCCESS_PATH);
    await expect(page.locator(STATUS_SELECTOR)).toHaveAttribute(
      'data-state',
      'idle',
    );

    await expect(headingNamed(page, PURCHASE_HEADING)).toBeVisible();
    await expect(headingNamed(page, PENDING_HEADING)).toBeVisible();
    await expect(headingNamed(page, PRO_HEADING)).toHaveCount(0);
  });

  test('a saved license reported by the extension shows the Pro line', async ({
    page,
  }) => {
    await page.goto(CHECKOUT_SUCCESS_PATH);
    await expect(page.locator(STATUS_SELECTOR)).toHaveAttribute(
      'data-state',
      'idle',
    );

    await page.evaluate(installCheckoutBridgeStub, STORED_LICENSE_STATUS);

    await expect(headingNamed(page, PURCHASE_HEADING)).toBeVisible();
    await expect(headingNamed(page, PRO_HEADING)).toBeVisible();
  });

  test('a detection timeout with no extension shows the next-step line and not the Pro line', async ({
    page,
  }) => {
    await page.clock.install();
    await page.goto(CHECKOUT_SUCCESS_PATH);
    await expect(page.locator(STATUS_SELECTOR)).toHaveAttribute(
      'data-state',
      'idle',
    );

    await page.clock.fastForward(DETECTION_TIMEOUT_MS + 1);

    await expect(page.locator(STATUS_SELECTOR)).toHaveAttribute(
      'data-state',
      'noExtension',
    );
    await expect(headingNamed(page, PURCHASE_HEADING)).toBeVisible();
    await expect(headingNamed(page, NEXT_STEP_HEADING)).toBeVisible();
    await expect(headingNamed(page, PRO_HEADING)).toHaveCount(0);
  });

  test('a missing checkout reference leads with the recovery line and drops the purchase line', async ({
    page,
  }) => {
    await page.goto(SUCCESS_PATH);
    await expect(page.locator(STATUS_SELECTOR)).toHaveAttribute(
      'data-state',
      'missingCheckout',
    );

    await expect(headingNamed(page, MISSING_CHECKOUT_HEADING)).toBeVisible();
    await expect(headingNamed(page, PURCHASE_HEADING)).toHaveCount(0);
    await expect(headingNamed(page, PRO_HEADING)).toHaveCount(0);
  });
});
