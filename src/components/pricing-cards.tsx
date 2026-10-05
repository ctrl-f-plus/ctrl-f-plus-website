// src/components/pricing-cards.tsx
'use client';

import React, { useId, useState } from 'react';
import { BILLING_PERIOD, BillingPeriod, PricingTier } from '@/listing.schema';
import {
  describePlanBillingPeriod,
  formatPlanPrice,
  selectPlanForBillingPeriod,
} from '@/lib/pricing';
import { CheckIcon } from '@/components/icons/check-icon';
import { FadeIn } from '@/components/fade-in';
import Button from '@/components/ui/Button';
import { cva, cx } from '../../cva.config';
import { Badge } from '@/components/ui/badge';

const billingPeriodOptions = {
  [BILLING_PERIOD.MONTH]: { label: 'Monthly' },
  [BILLING_PERIOD.YEAR]: { label: 'Annually' },
} satisfies Record<BillingPeriod, { label: string }>;

const billingPeriodKeys = Object.keys(billingPeriodOptions) as BillingPeriod[];

// The default card sits flush against the featured card. Its 24px inset matches
// the corner radius, so the featured card's rounded corners clear it cleanly.
const pricingCardVariants = cva({
  base: 'flex min-w-0 flex-col p-7 text-shark tablet:p-10',
  variants: {
    variant: {
      default:
        'mx-6 rounded-t-3xl border border-b-0 border-highlighter-900/10 bg-white/[.68] laptop:mx-0 laptop:my-6 laptop:rounded-l-3xl laptop:rounded-r-none laptop:border-b laptop:border-r-0',
      inverted:
        'relative rounded-3xl bg-highlighter-focus-50 ring-1 ring-highlighter-focus-400',
    },
  },
  defaultVariants: { variant: 'default' },
});

export function BillingPeriodToggle({
  value,
  onChange,
}: Readonly<{
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}>) {
  const groupName = useId();

  return (
    <fieldset className="shrink-0">
      <legend className="sr-only">Payment frequency</legend>
      <div className="grid grid-cols-2 gap-x-1 rounded-full bg-white/[.68] p-1 text-center text-xs/5 font-semibold ring-1 ring-inset ring-highlighter-900/10">
        {billingPeriodKeys.map((billingPeriod) => (
          <label
            key={billingPeriod}
            className="group relative flex min-h-[28px] items-center justify-center rounded-full px-2.5 py-1 hover:bg-highlighter-900/5 [&:has(:checked)]:bg-highlighter-900"
          >
            <input
              type="radio"
              name={groupName}
              value={billingPeriod}
              checked={value === billingPeriod}
              onChange={() => onChange(billingPeriod)}
              className="absolute inset-0 cursor-pointer appearance-none rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-highlighter-500"
            />
            <span className="text-gray-500 group-[:has(:checked)]:text-white">
              {billingPeriodOptions[billingPeriod].label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function PricingCard({
  tier,
}: Readonly<{
  tier: PricingTier;
}>) {
  const headingId = useId();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(
    BILLING_PERIOD.MONTH,
  );
  const variant = tier.isFeatured ? 'inverted' : 'default';
  const selectedPlan = selectPlanForBillingPeriod(tier.plans, billingPeriod);
  const billingPeriodSuffix = describePlanBillingPeriod(selectedPlan);
  const offersBillingPeriodChoice = billingPeriodKeys.every(
    (billingPeriodKey) =>
      tier.plans.some((plan) => plan.billingPeriod === billingPeriodKey),
  );

  return (
    <article
      aria-labelledby={headingId}
      className={pricingCardVariants({ variant })}
    >
      <div className="flex min-h-[28px] flex-wrap items-center justify-between gap-2">
        <h3 id={headingId} className="font-inter text-card-heading text-shark">
          {tier.name}
        </h3>

        {tier.isFeatured && <Badge variant="brand2">Featured plan</Badge>}
      </div>

      <p className="mt-3 font-arimo text-body-sm text-shark/80">
        {tier.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span
            className={cx(
              'font-inter text-shark',
              tier.isFeatured ? 'text-status-lg' : 'text-status',
            )}
          >
            {formatPlanPrice(selectedPlan)}
          </span>
          {billingPeriodSuffix && (
            <span className="font-arimo text-body-sm text-shark/80">
              {billingPeriodSuffix}
            </span>
          )}
        </p>

        {offersBillingPeriodChoice && (
          <BillingPeriodToggle
            value={billingPeriod}
            onChange={setBillingPeriod}
          />
        )}
      </div>

      <div className="mt-6">
        <Button
          aTag
          href={selectedPlan.href}
          target="_blank"
          rel="noreferrer"
          aria-describedby={headingId}
          intent={tier.isFeatured ? 'solid' : 'outline'}
          size={tier.isFeatured ? 'thin' : 'compact'}
        >
          {tier.cta}
        </Button>
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-highlighter-900/10 pt-6 font-arimo text-body-sm text-shark/80">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-x-2.5">
            <CheckIcon
              aria-hidden="true"
              className="h-6 w-4 flex-none text-highlighter-500"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PricingCards({
  pricingTiers,
}: Readonly<{
  pricingTiers: PricingTier[];
}>) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="mt-10 text-left">
      <FadeIn className="flex w-full flex-col items-center justify-center">
        <h2 id={headingId} className="sr-only">
          Compare plans
        </h2>

        <div className="isolate mx-auto grid w-full max-w-lg grid-cols-1 laptop:max-w-4xl laptop:grid-cols-2">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
