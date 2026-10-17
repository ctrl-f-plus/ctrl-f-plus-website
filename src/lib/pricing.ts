// src/lib/pricing.ts

import type { BillingPeriod, PricingPlan } from '@/listing.schema';

// Polar copies these from the checkout link onto the order's metadata.
export const ATTRIBUTION_PARAM_NAMES = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

// A tier with one period-less plan (Free, Lifetime) shows that plan whatever the toggle says.
export function selectPlanForBillingPeriod(
  plans: readonly PricingPlan[],
  billingPeriod: BillingPeriod,
): PricingPlan {
  return (
    plans.find((plan) => plan.billingPeriod === billingPeriod) ??
    plans.find((plan) => plan.billingPeriod === null) ??
    plans[0]
  );
}

// The locale is pinned so the build-time HTML and the client render match exactly.
export function formatPlanPrice(plan: PricingPlan): string {
  const isWholeDollarAmount = plan.amount % 100 === 0;
  const fractionDigits = isWholeDollarAmount ? 0 : 2;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: plan.currency.toUpperCase(),
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(plan.amount / 100);
}

export function describePlanBillingPeriod(plan: PricingPlan): string | null {
  if (plan.billingPeriod !== null) {
    return `/ ${plan.billingPeriod}`;
  }

  return plan.amount === 0 ? null : 'one-time';
}

function parseAbsoluteUrl(href: string): URL | null {
  try {
    return new URL(href);
  } catch {
    return null;
  }
}

export function forwardAttributionParams(
  checkoutHref: string,
  pageSearchParams: URLSearchParams,
): string {
  const checkoutUrl = parseAbsoluteUrl(checkoutHref);
  if (checkoutUrl === null) return checkoutHref;

  for (const paramName of ATTRIBUTION_PARAM_NAMES) {
    const paramValue = pageSearchParams.get(paramName);
    if (paramValue) checkoutUrl.searchParams.set(paramName, paramValue);
  }
  return checkoutUrl.toString();
}
