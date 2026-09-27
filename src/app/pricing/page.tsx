// src/app/page.tsx
import 'server-only';

import { PricingCards } from '@/components/pricing-cards';
import React from 'react';
import { z } from 'zod';
import { Listing, listingSchema } from '@/listing.schema';
import {
  PageTitleCard,
  PageTitleCardDescription,
  PageTitleCardTitle,
} from '@/components/page-title-card';
import { FadeInStagger } from '@/components/fade-in';
import Container from '@/components/ui/container';
import PageBodyCard from '@/components/page-body-card';

const API_URL = process.env.API_URL;

async function listListings(): Promise<Listing[]> {
  const res = await fetch(`${API_URL}/v1/listings`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch listings: ${res.status} ${res.statusText}`,
    );
  }
  const resJson = await res.json();
  return z.array(listingSchema).parse(resJson.data);
}

export default async function Page() {
  const pricingTiers = await listListings();

  return (
    <Container className="mt-18 flex flex-col tablet:mt-24">
      <FadeInStagger>
        <PageTitleCard>
          <PageTitleCardTitle>Pricing</PageTitleCardTitle>

          <PageTitleCardDescription>
            Pick a plan for your tab habit
          </PageTitleCardDescription>
        </PageTitleCard>

        {/*<PageBodyCard>*/}
        <PricingCards pricingTiers={pricingTiers} />
        {/*</PageBodyCard>*/}
      </FadeInStagger>
    </Container>
  );
}
