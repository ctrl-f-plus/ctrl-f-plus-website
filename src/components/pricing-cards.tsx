// src/components/feature-cards.tsx
'use client';

import { Listing } from '@/listing.schema';
import { CheckIcon } from '@/components/icons/check-icon';
import { FadeIn } from '@/components/fade-in';
import React, { useId, useState } from 'react';
import { cx } from '../../cva.config';

type PaymentFrequency = keyof Listing['price'];

export function PricingFieldSet({
  paymentFrequency,
  onFrequencyChange,
}: Readonly<{
  paymentFrequency: PaymentFrequency;
  onFrequencyChange: (paymentFrequency: PaymentFrequency) => void;
}>) {
  const frequencyGroupId = useId();

  return (
    <div
      //mt-16
      className="ml-auto flex shrink-0"
    >
      <fieldset aria-label="Payment frequency">
        <div className="grid grid-cols-2 gap-x-1 rounded-full bg-white/[.68] p-0.5 text-center text-xs/5 font-semibold ring-1 ring-inset ring-highlighter-900/10">
          <label
            //bg-highlighter-900 text-white
            className="group relative flex min-h-[28px] items-center justify-center rounded-full px-2.5 py-1 hover:bg-highlighter-900/5 [&:has(:checked)]:bg-highlighter-900"
          >
            <input
              value="monthly"
              checked={paymentFrequency === 'monthly'}
              onChange={() => onFrequencyChange('monthly')}
              name={frequencyGroupId}
              type="radio"
              className="absolute inset-0 cursor-pointer appearance-none rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-highlighter-500"
            />
            <span className="text-gray-500 group-[:has(:checked)]:text-white">
              Monthly
            </span>
          </label>

          <label className="group relative flex min-h-[28px] items-center justify-center rounded-full px-2.5 py-1 hover:bg-highlighter-900/5 [&:has(:checked)]:bg-highlighter-900">
            <input
              value="annually"
              checked={paymentFrequency === 'annually'}
              onChange={() => onFrequencyChange('annually')}
              name={frequencyGroupId}
              type="radio"
              className="absolute inset-0 cursor-pointer appearance-none rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-highlighter-500"
            />
            <span className="text-gray-500 group-[:has(:checked)]:text-white">
              Annually
            </span>
          </label>
        </div>
      </fieldset>
    </div>
  );
}

function PricingCard({
  tier,
  paymentFrequency,
}: Readonly<{ tier: Listing; paymentFrequency: PaymentFrequency }>) {
  return (
    <article
      aria-labelledby={`tier-${tier.id}`}
      data-featured={tier.isFeatured ? 'true' : undefined}
      // data-[featured]:ring-highlighter-focus-400
      // data-[featured]:ring-highlighter-900
      // data-[featured]:ring-highlighter-500
      className="group/tier flex min-w-0 flex-col rounded-3xl bg-white/[.68] p-6 text-shark ring-1 ring-highlighter-900/10 data-[featured]:bg-highlighter-focus-50 data-[featured]:ring-highlighter-focus-400 tablet:p-7 laptop:p-6 wide:p-7"
    >
      {/* -------------------------------------------- */}
      <div className="flex min-h-[28px] flex-wrap items-center justify-between gap-2">
        <h3
          id={`tier-${tier.id}`}
          className="font-inter text-card-heading text-shark"
        >
          {tier.name}
        </h3>
        {tier.isFeatured && (
          <span className="rounded-full bg-highlighter-focus-100 px-2.5 font-arimo text-body-sm text-shark/80">
            Featured plan
          </span>
        )}
      </div>
      <p className="mt-2 font-arimo text-body-sm text-shark/80 laptop:min-h-[3.5rem]">
        {tier.description}
      </p>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1"
      >
        <span className="font-inter text-subtitle text-shark">
          {tier.price[paymentFrequency]}
        </span>
        <span className="font-arimo text-body-sm text-shark/80">
          / {paymentFrequency === 'monthly' ? 'month' : 'year'}
        </span>
      </p>

      <a
        className={cx(
          'mt-6 flex min-h-[44px] w-full items-center justify-center rounded-full border px-4 py-2.5 text-center font-open-sans text-button-label focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 motion-safe:transition-colors',
          tier.isFeatured
            ? 'border-highlighter-900 bg-highlighter-900 text-white hover:bg-highlighter-900/90 focus-visible:outline-highlighter-500 active:bg-highlighter-950 active:text-white/80'
            : 'border-highlighter-900/30 text-highlighter-900 hover:bg-highlighter-900/5 focus-visible:outline-highlighter-500 active:text-highlighter-950/70',
        )}
        href={process.env.NEXT_PUBLIC_OPEN_COLLECTIVE_URL}
        aria-describedby={`tier-${tier.id}`}
        target="_blank"
        rel="noreferrer"
      >
        {tier.cta}
      </a>

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

      {/*</div>*/}
    </article>
  );
}

export function PricingCards({
  pricingTiers,
}: Readonly<{
  pricingTiers: Listing[];
}>) {
  const pricingHeadingId = useId();
  const [paymentFrequency, setPaymentFrequency] =
    useState<PaymentFrequency>('monthly');

  return (
    // <Container className="relative mt-18 flex w-full flex-col tablet:mt-24 wide:mt-[7.625rem]">
    <section aria-labelledby={pricingHeadingId} className="mt-8 text-left">
      {/*<CardShell*/}
      {/*  // variant="inverted"*/}
      {/*  shadow="xl"*/}
      {/*  // h-[32.8125rem]*/}
      {/*  // className="relative isolate overflow-hidden px-[2.25rem] text-center"*/}
      {/*  //*/}
      {/*  //*/}
      {/*  className="min-h-154 overflow-hidden tablet:p-9 tab-pro:p-14 laptop:min-h-146 laptop:p-16 desktop:p-20 wide:p-24"*/}
      {/*>*/}
      <FadeIn
        // gap-9
        className="flex w-full flex-col items-center justify-center"
      >
        <div className="flex w-full max-w-lg flex-wrap items-center justify-between gap-x-2 gap-y-3 laptop:max-w-none">
          <h2
            id={pricingHeadingId}
            className="font-inter text-card-heading text-shark"
          >
            Compare plans
          </h2>
          <PricingFieldSet
            paymentFrequency={paymentFrequency}
            onFrequencyChange={setPaymentFrequency}
          />
        </div>

        {/* Pricing Tier Cards */}
        <div className="isolate mx-auto mt-4 grid w-full max-w-lg grid-cols-1 gap-5 laptop:max-w-none laptop:grid-cols-3">
          {pricingTiers.map((tier: Listing) => (
            <PricingCard
              tier={tier}
              paymentFrequency={paymentFrequency}
              key={tier.id}
            />
          ))}
        </div>
      </FadeIn>
      {/*</CardShell>*/}
    </section>
    // </Container>
  );
}
