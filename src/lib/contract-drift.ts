// src/lib/contract-drift.ts

import { z } from 'zod';

type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

export type ContractOperation = {
  path: string;
  method: string;
  status: string;
};

const NON_CONTRACT_KEYS = [
  '$schema',
  'additionalProperties',
  'description',
  'title',
  'example',
  'examples',
];
const UNORDERED_LIST_KEYS = ['required', 'enum'];
const FIELD_SCHEMAS_KEY = 'properties';
const NULL_TYPE = 'null';

function isJsonObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readNestedValue(document: JsonObject, segments: string[]): JsonValue {
  let currentValue: JsonValue = document;

  for (const segment of segments) {
    if (!isJsonObject(currentValue) || !(segment in currentValue)) {
      throw new Error(
        `The OpenAPI document has nothing at ${segments.join(' > ')}`,
      );
    }
    currentValue = currentValue[segment];
  }

  return currentValue;
}

function parseJsonPointer(jsonPointer: string): string[] {
  return jsonPointer
    .replace(/^#\//, '')
    .split('/')
    .map((segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~'));
}

function resolveReferences(value: JsonValue, document: JsonObject): JsonValue {
  if (Array.isArray(value)) {
    return value.map((item) => resolveReferences(item, document));
  }
  if (!isJsonObject(value)) {
    return value;
  }
  if (typeof value.$ref === 'string') {
    const referencedValue = readNestedValue(
      document,
      parseJsonPointer(value.$ref),
    );
    return resolveReferences(referencedValue, document);
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      resolveReferences(nestedValue, document),
    ]),
  );
}

// The API and zod write "this or null" differently, so both become one nullable flag.
function mergeNullability(schemaNode: JsonObject): JsonObject {
  const { anyOf, ...otherKeys } = schemaNode;
  const alternatives = Array.isArray(anyOf) ? anyOf.filter(isJsonObject) : [];
  const nonNullAlternatives = alternatives.filter(
    (alternative) => alternative.type !== NULL_TYPE,
  );
  const isNullableUnion =
    alternatives.length === 2 && nonNullAlternatives.length === 1;
  if (isNullableUnion) {
    return { ...otherKeys, ...nonNullAlternatives[0], nullable: true };
  }

  if (!Array.isArray(schemaNode.type) || !schemaNode.type.includes(NULL_TYPE)) {
    return schemaNode;
  }
  const nonNullTypes = schemaNode.type.filter((type) => type !== NULL_TYPE);
  const mergedNode: JsonObject = {
    ...schemaNode,
    type: nonNullTypes.length === 1 ? nonNullTypes[0] : nonNullTypes,
    nullable: true,
  };
  if (Array.isArray(schemaNode.enum)) {
    mergedNode.enum = schemaNode.enum.filter((allowed) => allowed !== null);
  }
  return mergedNode;
}

function sortByJson(values: JsonValue[]): JsonValue[] {
  return [...values].sort((left, right) =>
    JSON.stringify(left).localeCompare(JSON.stringify(right)),
  );
}

function normalizeSchemaNode(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map(normalizeSchemaNode);
  }
  if (!isJsonObject(value)) {
    return value;
  }

  const normalizedNode: JsonObject = {};
  for (const [key, nestedValue] of Object.entries(mergeNullability(value))) {
    // zod states the safe-integer ceiling that every JSON integer already has.
    const isImpliedIntegerBound =
      key === 'maximum' && nestedValue === Number.MAX_SAFE_INTEGER;
    if (NON_CONTRACT_KEYS.includes(key) || isImpliedIntegerBound) {
      continue;
    }

    if (key === FIELD_SCHEMAS_KEY && isJsonObject(nestedValue)) {
      normalizedNode[key] = normalizeFieldSchemas(nestedValue);
      continue;
    }

    const isUnorderedList =
      UNORDERED_LIST_KEYS.includes(key) && Array.isArray(nestedValue);
    normalizedNode[key] = isUnorderedList
      ? sortByJson(nestedValue)
      : normalizeSchemaNode(nestedValue);
  }
  return normalizedNode;
}

// Keys here are field names, so a field called "description" must survive.
function normalizeFieldSchemas(fieldSchemas: JsonObject): JsonObject {
  return Object.fromEntries(
    Object.entries(fieldSchemas).map(([fieldName, fieldSchema]) => [
      fieldName,
      normalizeSchemaNode(fieldSchema),
    ]),
  );
}

function describeValue(value: JsonValue | undefined): string {
  return value === undefined ? 'nothing' : JSON.stringify(value);
}

function collectDifferences(
  publishedValue: JsonValue | undefined,
  websiteValue: JsonValue | undefined,
  schemaPath: string,
): string[] {
  if (isJsonObject(publishedValue) && isJsonObject(websiteValue)) {
    const keys = new Set([
      ...Object.keys(publishedValue),
      ...Object.keys(websiteValue),
    ]);
    return [...keys]
      .sort()
      .flatMap((key) =>
        collectDifferences(
          publishedValue[key],
          websiteValue[key],
          schemaPath === '' ? key : `${schemaPath}.${key}`,
        ),
      );
  }

  if (JSON.stringify(publishedValue) === JSON.stringify(websiteValue)) {
    return [];
  }
  return [
    `${schemaPath}: the API publishes ${describeValue(publishedValue)} but the website expects ${describeValue(websiteValue)}`,
  ];
}

function toJsonValue(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value));
}

export function findContractDifferences({
  openApiDocument,
  operation,
  websiteSchema,
}: {
  openApiDocument: unknown;
  operation: ContractOperation;
  websiteSchema: z.ZodType;
}): string[] {
  const document = toJsonValue(openApiDocument);
  if (!isJsonObject(document)) {
    throw new Error('The OpenAPI document is not a JSON object');
  }

  const publishedSchema = resolveReferences(
    readNestedValue(document, [
      'paths',
      operation.path,
      operation.method,
      'responses',
      operation.status,
      'content',
      'application/json',
      'schema',
    ]),
    document,
  );

  return collectDifferences(
    normalizeSchemaNode(publishedSchema),
    normalizeSchemaNode(toJsonValue(z.toJSONSchema(websiteSchema))),
    '',
  );
}
