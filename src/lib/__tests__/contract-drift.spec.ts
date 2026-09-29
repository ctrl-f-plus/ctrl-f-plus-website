// src/lib/__tests__/contract-drift.spec.ts

import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import {
  BILLING_PERIOD,
  CURRENCY,
  PRICING_TIER_ID,
  billingPeriodSchema,
} from '@/listing.schema';
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
const LISTINGS_COMPONENT_NAME = 'ListingsResponseBody';
const LABEL_COMPONENT_NAME = 'Label';
const PUBLISHED_MIN_LENGTH = 10;
const WEBSITE_MIN_LENGTH = 1;
const EXTRA_FIELD_SCHEMA = { type: 'number' };

function buildOpenApiDocumentPublishing(
  publishedSchema: Record<string, unknown>,
  componentSchemas: Record<string, unknown> = {},
) {
  return {
    openapi: '3.1.0',
    paths: {
      [LISTINGS_OPERATION.path]: {
        [LISTINGS_OPERATION.method]: {
          responses: {
            [LISTINGS_OPERATION.status]: {
              content: { 'application/json': { schema: publishedSchema } },
            },
          },
        },
      },
    },
    components: { schemas: componentSchemas },
  };
}

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

function buildListingsDocument({
  publishedPlanSchema = buildPublishedPlanSchema(),
  tierProperties = {},
}: {
  publishedPlanSchema?: ReturnType<typeof buildPublishedPlanSchema>;
  tierProperties?: Record<string, unknown>;
} = {}) {
  return buildOpenApiDocumentPublishing(
    { $ref: `#/components/schemas/${LISTINGS_COMPONENT_NAME}` },
    {
      [LISTINGS_COMPONENT_NAME]: {
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
  );
}

function findListingsDifferences(openApiDocument: unknown) {
  return findContractDifferences({
    openApiDocument,
    operation: LISTINGS_OPERATION,
    websiteSchema: listingsResponseSchema,
  });
}

function findDifferencesBetween({
  publishedSchema,
  componentSchemas,
  websiteSchema,
}: {
  publishedSchema: Record<string, unknown>;
  componentSchemas?: Record<string, unknown>;
  websiteSchema: z.ZodType;
}) {
  return findContractDifferences({
    openApiDocument: buildOpenApiDocumentPublishing(
      publishedSchema,
      componentSchemas,
    ),
    operation: LISTINGS_OPERATION,
    websiteSchema,
  });
}

describe('findContractDifferences', () => {
  test('a document that publishes the same contract in its own notation yields no differences', () => {
    const openApiDocument = buildListingsDocument();

    expect(findListingsDifferences(openApiDocument)).toEqual([]);
  });

  test('a published billing period the website does not list is reported at the enum', () => {
    const openApiDocument = buildListingsDocument({
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
    const openApiDocument = buildListingsDocument({
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
    const openApiDocument = buildListingsDocument({
      publishedPlanSchema: buildPublishedPlanSchema({
        required: stillRequiredFieldNames,
      }),
    });

    expect(findListingsDifferences(openApiDocument)).toEqual([
      `${PLAN_SCHEMA_PATH}.required: the API publishes ${JSON.stringify(stillRequiredFieldNames)} but the website expects ${JSON.stringify(SORTED_PLAN_FIELD_NAMES)}`,
    ]);
  });

  test('a billing period the API stops allowing to be null is reported at the nullable flag', () => {
    const openApiDocument = buildListingsDocument({
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
    const openApiDocument = buildListingsDocument({
      tierProperties: { description: { type: CHANGED_FIELD_TYPE } },
    });

    expect(findListingsDifferences(openApiDocument)).toEqual([
      `${TIER_SCHEMA_PATH}.properties.description.type: the API publishes "${CHANGED_FIELD_TYPE}" but the website expects "string"`,
    ]);
  });

  test('a document that does not describe the operation is rejected with the missing location', () => {
    const openApiDocument = { ...buildListingsDocument(), paths: {} };

    expect(() => findListingsDifferences(openApiDocument)).toThrow(
      `The OpenAPI document has nothing at ${RESPONSE_SCHEMA_LOCATION}`,
    );
  });

  test('a published enum that leaves null out is reported against a website enum that allows null', () => {
    const contractDifferences = findDifferencesBetween({
      publishedSchema: {
        type: ['string', 'null'],
        enum: Object.values(BILLING_PERIOD),
      },
      websiteSchema: billingPeriodSchema.nullable(),
    });

    expect(contractDifferences).toEqual([
      'nullable: the API publishes nothing but the website expects true',
    ]);
  });

  test('a constraint published beside a reference is reported at that constraint', () => {
    const contractDifferences = findDifferencesBetween({
      publishedSchema: {
        $ref: `#/components/schemas/${LABEL_COMPONENT_NAME}`,
        minLength: PUBLISHED_MIN_LENGTH,
      },
      componentSchemas: { [LABEL_COMPONENT_NAME]: { type: 'string' } },
      websiteSchema: z.string(),
    });

    expect(contractDifferences).toEqual([
      `minLength: the API publishes ${PUBLISHED_MIN_LENGTH} but the website expects nothing`,
    ]);
  });

  test('a published value type for extra fields is reported instead of being read as a strictness flag', () => {
    const contractDifferences = findDifferencesBetween({
      publishedSchema: {
        type: 'object',
        properties: { name: { type: 'string' } },
        required: ['name'],
        additionalProperties: EXTRA_FIELD_SCHEMA,
      },
      websiteSchema: z.object({ name: z.string() }),
    });

    expect(contractDifferences).toEqual([
      `additionalProperties: the API publishes ${JSON.stringify(EXTRA_FIELD_SCHEMA)} but the website expects nothing`,
    ]);
  });

  test('a safe-integer ceiling published on a plain number is reported', () => {
    const contractDifferences = findDifferencesBetween({
      publishedSchema: { type: 'number', maximum: Number.MAX_SAFE_INTEGER },
      websiteSchema: z.number(),
    });

    expect(contractDifferences).toEqual([
      `maximum: the API publishes ${Number.MAX_SAFE_INTEGER} but the website expects nothing`,
    ]);
  });

  test('an integer published without bounds matches a website integer', () => {
    const contractDifferences = findDifferencesBetween({
      publishedSchema: { type: 'integer' },
      websiteSchema: z.number().int(),
    });

    expect(contractDifferences).toEqual([]);
  });

  test('a constraint published beside a nullable union is reported instead of being overwritten by the union', () => {
    const contractDifferences = findDifferencesBetween({
      publishedSchema: {
        minLength: PUBLISHED_MIN_LENGTH,
        anyOf: [
          { type: 'string', minLength: WEBSITE_MIN_LENGTH },
          { type: 'null' },
        ],
      },
      websiteSchema: z.string().min(WEBSITE_MIN_LENGTH).nullable(),
    });

    expect(contractDifferences).toContain(
      `minLength: the API publishes ${PUBLISHED_MIN_LENGTH} but the website expects ${WEBSITE_MIN_LENGTH}`,
    );
  });

  test('a published union that also admits any value is reported instead of being read as nullable', () => {
    const contractDifferences = findDifferencesBetween({
      publishedSchema: { anyOf: [{ type: 'string' }, { type: 'null' }, true] },
      websiteSchema: z.string().nullable(),
    });

    expect(contractDifferences).toContain(
      'type: the API publishes nothing but the website expects "string"',
    );
  });

  test('schemas inside a list that differ only in key order yield no differences', () => {
    const contractDifferences = findDifferencesBetween({
      publishedSchema: {
        type: 'array',
        prefixItems: [{ minLength: WEBSITE_MIN_LENGTH, type: 'string' }],
      },
      websiteSchema: z.tuple([z.string().min(WEBSITE_MIN_LENGTH)]),
    });

    expect(contractDifferences).toEqual([]);
  });
});
