// packages/api-contracts/src/listing.schema.ts

import { z } from 'zod';

// Upstream imports this from @repo/toolbox-validators, which the website cannot depend on.
export const CURRENCY = {
  USD: 'usd',
} as const;

export const PRICING_TIER_ID = {
  FREE: 'tier-free',
  PRO: 'tier-pro',
  LIFETIME: 'tier-lifetime',
} as const;

export const BILLING_PERIOD = {
  MONTH: 'month',
  YEAR: 'year',
} as const;

export const currencySchema = z.enum(CURRENCY);
export const pricingTierIdSchema = z.enum(PRICING_TIER_ID);
export const billingPeriodSchema = z.enum(BILLING_PERIOD);
export const pricingPlanSchema = z.object({
  billingPeriod: billingPeriodSchema.nullable(),
  amount: z.number().int().nonnegative(),
  currency: currencySchema,
  href: z.string(),
});
export const pricingTierSchema = z.object({
  id: pricingTierIdSchema,
  name: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  isFeatured: z.boolean(),
  cta: z.string(),
  plans: z.array(pricingPlanSchema).min(1),
});

export type Currency = z.infer<typeof currencySchema>;
export type PricingPlan = z.infer<typeof pricingPlanSchema>;
export type PricingTier = z.infer<typeof pricingTierSchema>;
export type BillingPeriod = z.infer<typeof billingPeriodSchema>;
export type PricingTierId = z.infer<typeof pricingTierIdSchema>;
