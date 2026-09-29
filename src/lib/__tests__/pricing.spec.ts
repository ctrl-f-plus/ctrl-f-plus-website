// src/lib/__tests__/pricing.spec.ts

import { describe, expect, test } from 'vitest';
import {
  CURRENCY,
  pricingPlanSchema,
  type PricingPlan,
} from '@/listing.schema';
import { formatPlanPrice } from '../pricing';

const MONTHLY_AMOUNT = 299;
const CHECKOUT_URL = 'https://example.com/checkout';

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
