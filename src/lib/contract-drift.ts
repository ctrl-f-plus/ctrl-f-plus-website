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

const ANNOTATION_KEYS = [
  '$schema',
  'description',
  'title',
  'example',
  'examples',
];
const UNORDERED_LIST_KEYS = ['required', 'enum'];
const FIELD_SCHEMAS_KEY = 'properties';
const STRICTNESS_KEY = 'additionalProperties';
const NULL_TYPE = 'null';
const INTEGER_TYPE = 'integer';

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

  const { $ref: jsonPointer, ...siblingKeys } = value;
  const resolvedSiblings = Object.fromEntries(
    Object.entries(siblingKeys).map(([key, nestedValue]) => [
      key,
      resolveReferences(nestedValue, document),
    ]),
  );
  if (typeof jsonPointer !== 'string') {
    return resolvedSiblings;
  }

  const referencedValue = resolveReferences(
    readNestedValue(document, parseJsonPointer(jsonPointer)),
    document,
  );
  // OpenAPI 3.1 lets constraints sit beside a reference, and they still apply.
  return isJsonObject(referencedValue)
    ? { ...referencedValue, ...resolvedSiblings }
    : referencedValue;
}

function isBareNullSchema(schemaNode: JsonValue): boolean {
  return (
    isJsonObject(schemaNode) &&
    schemaNode.type === NULL_TYPE &&
    Object.keys(schemaNode).length === 1
  );
}

// zod writes "this or null" as a two-member union with nothing else beside it.
function mergeNullableUnion(schemaNode: JsonObject): JsonObject {
  const { anyOf, ...siblingKeys } = schemaNode;
  if (!Array.isArray(anyOf) || anyOf.length !== 2) {
    return schemaNode;
  }

  const nonNullAlternatives = anyOf.filter(
    (alternative) => !isBareNullSchema(alternative),
  );
  const [nonNullAlternative] = nonNullAlternatives;
  const hasOnlyAnnotationsBeside = Object.keys(siblingKeys).every((key) =>
    ANNOTATION_KEYS.includes(key),
  );
  const isNullableUnion =
    nonNullAlternatives.length === 1 &&
    isJsonObject(nonNullAlternative) &&
    hasOnlyAnnotationsBeside;

  return isNullableUnion
    ? { ...nonNullAlternative, nullable: true }
    : schemaNode;
}

// The API writes "this or null" as a type list, with null repeated in any enum.
function mergeNullableTypeList(schemaNode: JsonObject): JsonObject {
  const {
    type: types,
    enum: allowedValues,
    nullable,
    ...otherKeys
  } = schemaNode;
  if (!Array.isArray(types) || !types.includes(NULL_TYPE)) {
    return schemaNode;
  }

  const nonNullTypes = types.filter((type) => type !== NULL_TYPE);
  const mergedNode: JsonObject = {
    ...otherKeys,
    type: nonNullTypes.length === 1 ? nonNullTypes[0] : nonNullTypes,
  };
  if (!Array.isArray(allowedValues)) {
    return { ...mergedNode, nullable: true };
  }

  // An enum decides on its own whether null is allowed, whatever the types say.
  mergedNode.enum = allowedValues.filter((allowed) => allowed !== null);
  if (allowedValues.includes(null)) {
    mergedNode.nullable = true;
  } else if (nullable !== undefined) {
    mergedNode.nullable = nullable;
  }
  return mergedNode;
}

function sortByJson(values: JsonValue[]): JsonValue[] {
  return [...values].sort((left, right) =>
    JSON.stringify(left).localeCompare(JSON.stringify(right)),
  );
}

// zod states the safe-integer bounds that every JSON integer already has.
function isImpliedIntegerBound(
  schemaNode: JsonObject,
  key: string,
  value: JsonValue,
): boolean {
  if (schemaNode.type !== INTEGER_TYPE) {
    return false;
  }
  return (
    (key === 'maximum' && value === Number.MAX_SAFE_INTEGER) ||
    (key === 'minimum' && value === Number.MIN_SAFE_INTEGER)
  );
}

function normalizeSchemaNode(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map(normalizeSchemaNode);
  }
  if (!isJsonObject(value)) {
    return value;
  }

  const schemaNode = mergeNullableTypeList(mergeNullableUnion(value));
  const normalizedNode: JsonObject = {};
  for (const [key, nestedValue] of Object.entries(schemaNode)) {
    // A true or false here only says how strictly extra fields are rejected.
    const isStrictnessFlag =
      key === STRICTNESS_KEY && typeof nestedValue === 'boolean';
    if (
      ANNOTATION_KEYS.includes(key) ||
      isStrictnessFlag ||
      isImpliedIntegerBound(schemaNode, key, nestedValue)
    ) {
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

function isListOfSchemas(value: JsonValue | undefined): value is JsonValue[] {
  return Array.isArray(value) && value.some(isJsonObject);
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

  const areSchemaListsOfEqualLength =
    isListOfSchemas(publishedValue) &&
    isListOfSchemas(websiteValue) &&
    publishedValue.length === websiteValue.length;
  if (areSchemaListsOfEqualLength) {
    return publishedValue.flatMap((publishedItem, index) =>
      collectDifferences(
        publishedItem,
        websiteValue[index],
        `${schemaPath}[${index}]`,
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
