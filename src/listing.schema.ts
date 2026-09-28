// packages/api-contracts/src/listing.schema.ts

import { z } from 'zod';

export const LISTING_ID = {
  FREE: 'tier-free',
  PRO: 'tier-pro',
  LIFETIME: 'tier-lifetime',
} as const;

export const listingIdSchema = z.enum(LISTING_ID);
export type ListingId = z.infer<typeof listingIdSchema>;

export const listingSchema = z.object({
  id: listingIdSchema,
  name: z.string(),
  href: z.string(),
  price: z.object({ monthly: z.string(), annually: z.string() }),
  description: z.string(),
  features: z.array(z.string()),
  isFeatured: z.boolean(),
  cta: z.string(),
});

export type Listing = z.infer<typeof listingSchema>;
