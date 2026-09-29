// src/listings-response.schema.ts

import { z } from 'zod';
import { pricingTierSchema } from './listing.schema';

export const LISTINGS_OPERATION = {
  path: '/v1/listings',
  method: 'get',
  status: '200',
} as const;

export const listingsResponseSchema = z.object({
  data: z.array(pricingTierSchema),
});
