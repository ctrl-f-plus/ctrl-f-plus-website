// src/cli/check-listings-contract.ts

import { loadEnvConfig } from '@next/env';
import { findContractDifferences } from '../lib/contract-drift';
import {
  LISTINGS_OPERATION,
  listingsResponseSchema,
} from '../listings-response.schema';

async function main() {
  loadEnvConfig(process.cwd(), false);

  const openApiUrl = `${process.env.API_URL}/openapi.json`;
  const openApiResponse = await fetch(openApiUrl);
  if (!openApiResponse.ok) {
    throw new Error(
      `Failed to fetch ${openApiUrl}: ${openApiResponse.status} ${openApiResponse.statusText}`,
    );
  }

  const contractDifferences = findContractDifferences({
    openApiDocument: await openApiResponse.json(),
    operation: LISTINGS_OPERATION,
    websiteSchema: listingsResponseSchema,
  });
  if (contractDifferences.length > 0) {
    console.error(
      `src/listing.schema.ts has drifted from the contract at ${openApiUrl}:`,
    );
    for (const contractDifference of contractDifferences) {
      console.error(`  ${contractDifference}`);
    }
    process.exit(1);
  }

  console.log(`ok  src/listing.schema.ts matches ${openApiUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
