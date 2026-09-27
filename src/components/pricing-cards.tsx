// src/components/pricing-cards.tsx
'use client';

import React, { useId, useState } from 'react';
import { Listing } from '@/listing.schema';
import { CheckIcon } from '@/components/icons/check-icon';
import { FadeIn } from '@/components/fade-in';
import Button from '@/components/ui/Button';
import { cva } from '../../cva.config';

type PaymentFrequency = keyof Listing['price'];

const paymentFrequencies = {
  monthly: { label: 'Monthly', unit: 'month' },
  annually: { label: 'Annually', unit: 'year' },
} satisfies Record<PaymentFrequency, { label: string; unit: string }>;

const paymentFrequencyKeys = Object.keys(
  paymentFrequencies,
) as PaymentFrequency[];

const pricingCardVariants = cva({
  base: 'flex min-w-0 flex-col rounded-3xl p-6 text-shark ring-1 tablet:p-7 laptop:p-6 wide:p-7',
  variants: {
    variant: {
      default: 'bg-white/[.68] ring-highlighter-900/10',
      inverted: 'bg-highlighter-focus-50 ring-highlighter-focus-400',
    },
  },
  defaultVariants: { variant: 'default' },
});

export function PaymentFrequencyToggle({
  value,
  onChange,
}: Readonly<{
  value: PaymentFrequency;
  onChange: (value: PaymentFrequency) => void;
}>) {
  const groupName = useId();

  return (
    <fieldset className="ml-auto shrink-0">
      <legend className="sr-only">Payment frequency</legend>
      <div className="grid grid-cols-2 gap-x-1 rounded-full bg-white/[.68] p-1 text-center text-xs/5 font-semibold ring-1 ring-inset ring-highlighter-900/10">
        {paymentFrequencyKeys.map((frequency) => (
          <label
            key={frequency}
            className="group relative flex min-h-[28px] items-center justify-center rounded-full px-2.5 py-1 hover:bg-highlighter-900/5 [&:has(:checked)]:bg-highlighter-900"
          >
            <input
              type="radio"
              name={groupName}
              value={frequency}
              checked={value === frequency}
              onChange={() => onChange(frequency)}
              className="absolute inset-0 cursor-pointer appearance-none rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-highlighter-500"
            />
            <span className="text-gray-500 group-[:has(:checked)]:text-white">
              {paymentFrequencies[frequency].label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function PricingCard({
  tier,
  paymentFrequency,
}: Readonly<{
  tier: Listing;
  paymentFrequency: PaymentFrequency;
}>) {
  const headingId = useId();
  const variant = tier.isFeatured ? 'inverted' : 'default';

  return (
    <article
      aria-labelledby={headingId}
      className={pricingCardVariants({ variant })}
    >
      <div className="flex min-h-[28px] flex-wrap items-center justify-between gap-2">
        <h3 id={headingId} className="font-inter text-card-heading text-shark">
          {tier.name}
        </h3>
        {tier.isFeatured && (
          <span className="rounded-full bg-highlighter-focus-100 px-2.5 font-arimo text-body-sm text-shark/80">
            Featured plan
          </span>
        )}
      </div>

      <p className="mt-2 font-arimo text-body-sm text-shark/80 laptop:min-h-[56px]">
        {tier.description}
      </p>

      <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-inter text-subtitle text-shark">
          {tier.price[paymentFrequency]}
        </span>
        <span className="font-arimo text-body-sm text-shark/80">
          / {paymentFrequencies[paymentFrequency].unit}
        </span>
      </p>

      <div className="mt-3">
        <Button
          aTag
          href={tier.href}
          target="_blank"
          rel="noreferrer"
          aria-describedby={headingId}
          intent={tier.isFeatured ? 'solid' : 'outline'}
          size="compact"
        >
          {tier.cta}
        </Button>
      </div>

      <ul className="mt-5 space-y-2.5 border-t border-highlighter-900/10 pt-5 font-arimo text-body-sm text-shark/80">
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
  pricingTiers: Listing[];
}>) {
  const headingId = useId();
  const [paymentFrequency, setPaymentFrequency] =
    useState<PaymentFrequency>('monthly');

  return (
    <section aria-labelledby={headingId} className="mt-8 text-left">
      <FadeIn className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-lg flex-wrap items-center justify-between gap-x-2 gap-y-3 laptop:max-w-none">
          <h2
            id={headingId}
            className="font-inter text-card-heading text-shark"
          >
            Compare plans
          </h2>
          <div>
            <PaymentFrequencyToggle
              value={paymentFrequency}
              onChange={setPaymentFrequency}
            />
          </div>
        </div>

        <div className="isolate mx-auto mt-4 grid w-full max-w-lg grid-cols-1 gap-5 laptop:max-w-none laptop:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              paymentFrequency={paymentFrequency}
            />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
