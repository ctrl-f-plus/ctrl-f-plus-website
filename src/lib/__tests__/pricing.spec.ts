// src/lib/__tests__/pricing.spec.ts

import { describe, expect, test } from 'vitest';
import {
  CURRENCY,
  pricingPlanSchema,
  type PricingPlan,
} from '@/listing.schema';
import {
  ATTRIBUTION_PARAM_NAMES,
  formatPlanPrice,
  forwardAttributionParams,
} from '../pricing';

const MONTHLY_AMOUNT = 299;
const CHECKOUT_URL = 'https://example.com/checkout';
const PRODUCT_ID = '0f1e2d3c-4b5a-4968-8776-655443322110';
const CHECKOUT_HREF = `${CHECKOUT_URL}?product_id=${PRODUCT_ID}`;
const FREE_TIER_HREF = '#';
const UTM_SOURCE = 'extension';
const UTM_CONTENT = 'layover-pdf-tabs-row';

function buildPricingPlan(overrides: Partial<PricingPlan> = {}): PricingPlan {
  const pricingPlan = {
    billingPeriod: null,
    amount: MONTHLY_AMOUNT,
    currency: CURRENCY.USD,
    href: CHECKOUT_URL,
    ...overrides,
  };
  return pricingPlanSchema.parse(pricingPlan);
}

describe('formatPlanPrice', () => {
  test.each([
    [MONTHLY_AMOUNT, '$2.99'],
    [450, '$4.50'],
    [500, '$5'],
    [0, '$0'],
    [100_000, '$1,000'],
  ])('an amount of %i cents renders as %s', (amount, expectedPrice) => {
    const pricingPlan = buildPricingPlan({ amount });

    expect(formatPlanPrice(pricingPlan)).toBe(expectedPrice);
  });
});

describe('forwardAttributionParams', () => {
  test.each(ATTRIBUTION_PARAM_NAMES)(
    'a %s parameter on the page is copied onto the checkout href',
    (paramName) => {
      const pageSearchParams = new URLSearchParams({ [paramName]: UTM_SOURCE });

      expect(forwardAttributionParams(CHECKOUT_HREF, pageSearchParams)).toBe(
        `${CHECKOUT_HREF}&${paramName}=${UTM_SOURCE}`,
      );
    },
  );

  test('several utm parameters are all copied after the product id', () => {
    const pageSearchParams = new URLSearchParams({
      utm_source: UTM_SOURCE,
      utm_content: UTM_CONTENT,
    });

    expect(forwardAttributionParams(CHECKOUT_HREF, pageSearchParams)).toBe(
      `${CHECKOUT_HREF}&utm_source=${UTM_SOURCE}&utm_content=${UTM_CONTENT}`,
    );
  });

  test('a page without utm parameters leaves the checkout href unchanged', () => {
    expect(forwardAttributionParams(CHECKOUT_HREF, new URLSearchParams())).toBe(
      CHECKOUT_HREF,
    );
  });

  test('a page parameter outside the utm names is not forwarded', () => {
    const pageSearchParams = new URLSearchParams({
      ref: 'newsletter',
      utm_source: UTM_SOURCE,
    });

    expect(forwardAttributionParams(CHECKOUT_HREF, pageSearchParams)).toBe(
      `${CHECKOUT_HREF}&utm_source=${UTM_SOURCE}`,
    );
  });

  test('an empty utm value is not forwarded', () => {
    const pageSearchParams = new URLSearchParams({ utm_source: '' });

    expect(forwardAttributionParams(CHECKOUT_HREF, pageSearchParams)).toBe(
      CHECKOUT_HREF,
    );
  });

  test("the free tier's placeholder href is returned as it is", () => {
    const pageSearchParams = new URLSearchParams({ utm_source: UTM_SOURCE });

    expect(forwardAttributionParams(FREE_TIER_HREF, pageSearchParams)).toBe(
      FREE_TIER_HREF,
    );
  });
});
