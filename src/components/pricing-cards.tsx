// src/components/feature-cards.tsx
'use client';

import CardShell from './ui/card-shell';
import Container from './ui/container';
import { Listing } from '@/listing.schema';
import { CheckIcon } from '@/components/icons/check-icon';
import React from 'react';
import {
  FeatureCardDescription,
  FeatureCardDescription2,
  FeatureCardSubtitle,
  FeatureCardTitle,
} from '@/components/feature-cards';
import Button from '@/components/ui/Button';

export function PricingFieldSet() {
  return (
    <div
      //mt-16
      className="flex justify-center"
    >
      <fieldset aria-label="Payment frequency">
        <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold ring-1 ring-inset ring-gray-200">
          <label
            //bg-highlighter-900 text-white
            className="group relative rounded-full px-2.5 py-1 [&:has(:checked)]:bg-highlighter-900"
          >
            <input
              defaultValue="monthly"
              defaultChecked
              name="frequency"
              type="radio"
              className="absolute inset-0 cursor-pointer appearance-none rounded-full"
            />
            <span className="text-gray-500 group-[:has(:checked)]:text-white">
              Monthly
            </span>
          </label>

          <label className="group relative rounded-full px-2.5 py-1 [&:has(:checked)]:bg-highlighter-900">
            <input
              defaultValue="annually"
              name="frequency"
              type="radio"
              className="absolute inset-0 cursor-pointer appearance-none rounded-full"
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

function PricingCard({ tier }: Readonly<{ tier: Listing }>) {
  return (
    <div
      key={tier.id}
      data-featured={tier.isFeatured ? 'true' : undefined}
      // data-[featured]:ring-highlighter-focus-400
      // data-[featured]:ring-highlighter-900
      // data-[featured]:ring-highlighter-500
      className="group/tier rounded-3xl bg-white/[.68] p-8 ring-1 ring-gray-200 data-[featured]:ring-2 data-[featured]:ring-highlighter-500 xl:p-10"
    >
      {/* -------------------------------------------- */}
      <FeatureCardTitle>{tier.name}</FeatureCardTitle>
      <FeatureCardDescription>
        {tier.price.monthly} / Month
      </FeatureCardDescription>
      <FeatureCardDescription>{tier.description}</FeatureCardDescription>

      {/*<div className="rounded-xl border p-2">*/}
      {/* -------------------------------------------- */}
      {/*<h3 className="mt-6 font-inter text-card-heading text-shark">*/}
      {/*  {tier.name}*/}
      {/*</h3>*/}
      {/*<p className="font-arimo text-body-sm text-shark/80">*/}
      {/*  {tier.price.monthly} / Month*/}
      {/*</p>*/}
      {/*<p className="mt-4 font-arimo text-body-sm text-shark/80">*/}
      {/*  {tier.description}*/}
      {/*</p>*/}
      {/*<button*/}
      {/*  value={tier.id}*/}
      {/*  name="tier"*/}
      {/*  type="submit"*/}
      {/*  aria-describedby={`tier-${tier.id}`}*/}
      {/*  className="shadow-xs group-data-featured/tier:bg-white/10 group-data-featured/tier:inset-ring group-data-featured/tier:inset-ring-white/5 group-data-featured/tier:hover:bg-white/20 group-data-featured/tier:focus-visible:outline-white/75 mt-6 block w-full rounded-md bg-highlighter-900 px-3 py-2 text-center text-sm/6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
      {/*>*/}
      {/*  {tier.cta}*/}
      {/*</button>*/}

      <Button
        intent={tier.isFeatured ? 'solid' : 'outline'}
        size="thin"
        className="mt-6"
        href={process.env.NEXT_PUBLIC_OPEN_COLLECTIVE_URL}
        aTag
        target={'_blank'}
      >
        {tier.cta}
      </Button>

      <ul className="mt-8 space-y-3 text-sm/6 text-gray-600 xl:mt-10">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckIcon
              aria-hidden="true"
              className="h-6 w-5 flex-none text-highlighter-900"
            />
            {feature}
          </li>
        ))}
      </ul>

      {/*</div>*/}
    </div>
  );
}

export function PricingCards({
  pricingTiers,
}: Readonly<{
  pricingTiers: Listing[];
}>) {
  return (
    // <Container className="relative mt-18 flex w-full flex-col tablet:mt-24 wide:mt-[7.625rem]">
    <div className="laptop:text-left">
      {/*<CardShell*/}
      {/*  // variant="inverted"*/}
      {/*  shadow="xl"*/}
      {/*  // h-[32.8125rem]*/}
      {/*  // className="relative isolate overflow-hidden px-[2.25rem] text-center"*/}
      {/*  //*/}
      {/*  //*/}
      {/*  className="min-h-154 overflow-hidden tablet:p-9 tab-pro:p-14 laptop:min-h-146 laptop:p-16 desktop:p-20 wide:p-24"*/}
      {/*>*/}
      <div
        // gap-9
        className="flex w-fit flex-col items-center justify-center"
      >
        <PricingFieldSet />
        {/*-------------*/}
        {/*<FeatureCardTitle>Pricing</FeatureCardTitle>*/}
        {/*<FeatureCardSubtitle>*/}
        {/*  Pick a plan for your tab habit*/}
        {/*</FeatureCardSubtitle>*/}
        {/*<FeatureCardDescription2>*/}
        {/*  <PricingFieldSet />*/}
        {/*</FeatureCardDescription2>*/}
        {/*-------------*/}

        {/* Pricing Tier Cards */}
        <div
          // TODO: Review `mt-10` vs `mt-9`
          className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {pricingTiers.map((tier: Listing) => (
            <PricingCard tier={tier} key={tier.id} />
          ))}
        </div>
      </div>
      {/*</CardShell>*/}
    </div>
    // </Container>
  );
}
