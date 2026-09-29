// src/lib/__tests__/contract-drift.spec.ts

import { describe, expect, test } from 'vitest';
import { BILLING_PERIOD, CURRENCY, PRICING_TIER_ID } from '@/listing.schema';
import {
  LISTINGS_OPERATION,
  listingsResponseSchema,
} from '@/listings-response.schema';
import { findContractDifferences } from '../contract-drift';

const TIER_SCHEMA_PATH = 'properties.data.items';
const PLAN_SCHEMA_PATH = `${TIER_SCHEMA_PATH}.properties.plans.items`;
const PLAN_FIELD_NAMES = ['billingPeriod', 'amount', 'currency', 'href'];
const SORTED_PLAN_FIELD_NAMES = ['amount', 'billingPeriod', 'currency', 'href'];
const UNKNOWN_BILLING_PERIOD = 'week';
const UNKNOWN_FIELD_NAME = 'trialDays';
const UNKNOWN_FIELD_SCHEMA = { type: 'integer' };
const CHANGED_FIELD_TYPE = 'integer';
const RESPONSE_SCHEMA_LOCATION = `paths > ${LISTINGS_OPERATION.path} > ${LISTINGS_OPERATION.method} > responses > ${LISTINGS_OPERATION.status} > content > application/json > schema`;

// The fixtures use the notation the API's generator emits, not the one zod emits.
function buildPublishedPlanSchema({
  properties = {},
  required = PLAN_FIELD_NAMES,
}: {
  properties?: Record<string, unknown>;
  required?: string[];
} = {}) {
  return {
    type: 'object',
    properties: {
      billingPeriod: {
        type: ['string', 'null'],
        enum: [...Object.values(BILLING_PERIOD), null],
      },
      amount: { type: 'integer', minimum: 0 },
      currency: { type: 'string', enum: Object.values(CURRENCY) },
      href: { type: 'string' },
      ...properties,
    },
    required,
  };
}

function buildOpenApiDocument({
  publishedPlanSchema = buildPublishedPlanSchema(),
  tierProperties = {},
}: {
  publishedPlanSchema?: ReturnType<typeof buildPublishedPlanSchema>;
  tierProperties?: Record<string, unknown>;
} = {}) {
  return {
    openapi: '3.1.0',
    paths: {
      [LISTINGS_OPERATION.path]: {
        [LISTINGS_OPERATION.method]: {
          responses: {
            [LISTINGS_OPERATION.status]: {
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ListingsResponseBody' },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ListingsResponseBody: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', enum: Object.values(PRICING_TIER_ID) },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  features: { type: 'array', items: { type: 'string' } },
                  isFeatured: { type: 'boolean' },
                  cta: { type: 'string' },
                  plans: {
                    type: 'array',
                    items: publishedPlanSchema,
                    minItems: 1,
                  },
                  ...tierProperties,
                },
                required: [
                  'id',
                  'name',
                  'description',
                  'features',
                  'isFeatured',
                  'cta',
                  'plans',
                ],
              },
            },
          },
          required: ['data'],
          additionalProperties: false,
        },
      },
    },
  };
}

function findListingsDifferences(openApiDocument: unknown) {
  return findContractDifferences({
    openApiDocument,
    operation: LISTINGS_OPERATION,
    websiteSchema: listingsResponseSchema,
  });
}

describe('findContractDifferences', () => {
  test('a document that publishes the same contract in its own notation yields no differences', () => {
    const openApiDocument = buildOpenApiDocument();

    expect(findListingsDifferences(openApiDocument)).toEqual([]);
  });

  test('a published billing period the website does not list is reported at the enum', () => {
    const openApiDocument = buildOpenApiDocument({
      publishedPlanSchema: buildPublishedPlanSchema({
        properties: {
          billingPeriod: {
            type: ['string', 'null'],
            enum: [
              ...Object.values(BILLING_PERIOD),
              UNKNOWN_BILLING_PERIOD,
              null,
            ],
          },
        },
      }),
    });

    expect(findListingsDifferences(openApiDocument)).toEqual([
      `${PLAN_SCHEMA_PATH}.properties.billingPeriod.enum: the API publishes ["${BILLING_PERIOD.MONTH}","${UNKNOWN_BILLING_PERIOD}","${BILLING_PERIOD.YEAR}"] but the website expects ["${BILLING_PERIOD.MONTH}","${BILLING_PERIOD.YEAR}"]`,
    ]);
  });

  test('a published field the website lacks is reported as expected by nothing', () => {
    const openApiDocument = buildOpenApiDocument({
      publishedPlanSchema: buildPublishedPlanSchema({
        properties: { [UNKNOWN_FIELD_NAME]: UNKNOWN_FIELD_SCHEMA },
      }),
    });

    expect(findListingsDifferences(openApiDocument)).toEqual([
      `${PLAN_SCHEMA_PATH}.properties.${UNKNOWN_FIELD_NAME}: the API publishes ${JSON.stringify(UNKNOWN_FIELD_SCHEMA)} but the website expects nothing`,
    ]);
  });

  test('a field the API stops requiring is reported at the required list', () => {
    const stillRequiredFieldNames = SORTED_PLAN_FIELD_NAMES.filter(
      (fieldName) => fieldName !== 'href',
    );
    const openApiDocument = buildOpenApiDocument({
      publishedPlanSchema: buildPublishedPlanSchema({
        required: stillRequiredFieldNames,
      }),
    });

    expect(findListingsDifferences(openApiDocument)).toEqual([
      `${PLAN_SCHEMA_PATH}.required: the API publishes ${JSON.stringify(stillRequiredFieldNames)} but the website expects ${JSON.stringify(SORTED_PLAN_FIELD_NAMES)}`,
    ]);
  });

  test('a billing period the API stops allowing to be null is reported at the nullable flag', () => {
    const openApiDocument = buildOpenApiDocument({
      publishedPlanSchema: buildPublishedPlanSchema({
        properties: {
          billingPeriod: {
            type: 'string',
            enum: Object.values(BILLING_PERIOD),
          },
        },
      }),
    });

    expect(findListingsDifferences(openApiDocument)).toEqual([
      `${PLAN_SCHEMA_PATH}.properties.billingPeriod.nullable: the API publishes nothing but the website expects true`,
    ]);
  });

  test('a published type change to a field named like a schema keyword is reported at that field', () => {
    const openApiDocument = buildOpenApiDocument({
      tierProperties: { description: { type: CHANGED_FIELD_TYPE } },
    });

    expect(findListingsDifferences(openApiDocument)).toEqual([
      `${TIER_SCHEMA_PATH}.properties.description.type: the API publishes "${CHANGED_FIELD_TYPE}" but the website expects "string"`,
    ]);
  });

  test('a document that does not describe the operation is rejected with the missing location', () => {
    const openApiDocument = { ...buildOpenApiDocument(), paths: {} };

    expect(() => findListingsDifferences(openApiDocument)).toThrow(
      `The OpenAPI document has nothing at ${RESPONSE_SCHEMA_LOCATION}`,
    );
  });
});
