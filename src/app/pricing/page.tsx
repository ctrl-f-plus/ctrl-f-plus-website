// src/app/pricing/page.tsx
import 'server-only';

import { PricingCards } from '@/components/pricing-cards';
import React from 'react';
import { PricingTier } from '@/listing.schema';
import {
  LISTINGS_OPERATION,
  listingsResponseSchema,
} from '@/listings-response.schema';
import {
  PageTitleCard,
  PageTitleCardDescription,
  PageTitleCardTitle,
} from '@/components/page-title-card';
import { FadeInStagger } from '@/components/fade-in';
import Container from '@/components/ui/container';

const API_URL = process.env.API_URL;

async function listListings(): Promise<PricingTier[]> {
  const res = await fetch(`${API_URL}${LISTINGS_OPERATION.path}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch listings: ${res.status} ${res.statusText}`,
    );
  }
  return listingsResponseSchema.parse(await res.json()).data;
}

export default async function Page() {
  const pricingTiers = await listListings();

  return (
    <Container className="mt-18 flex w-full flex-col tablet:mt-24">
      <FadeInStagger>
        <PageTitleCard className="justify-start">
          <PageTitleCardTitle>Pricing</PageTitleCardTitle>

          <PageTitleCardDescription>
            Start free, or choose a paid plan that fits your tab habit.
          </PageTitleCardDescription>
        </PageTitleCard>

        {/*<PageBodyCard>*/}
        <PricingCards pricingTiers={pricingTiers} />
        {/*</PageBodyCard>*/}
      </FadeInStagger>
    </Container>
  );
}
