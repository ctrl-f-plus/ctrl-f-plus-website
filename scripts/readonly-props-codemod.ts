// scripts/readonly-props-codemod.ts — jscodeshift codemod
// Wraps destructured function parameter type annotations with Readonly<>
//
// Usage:
//   Dry run (preview changes):
//     npx jscodeshift --parser tsx --extensions tsx --transform scripts/readonly-props-codemod.ts --dry --print app/ mdx-components.tsx
//   Apply:
//     npx jscodeshift --parser tsx --extensions tsx --transform scripts/readonly-props-codemod.ts app/ mdx-components.tsx
//
//   Or via package.json scripts:
//     pnpm codemod:readonly-props:dry
//     pnpm codemod:readonly-props

import type { API, FileInfo, ASTPath } from 'jscodeshift';

const FUNCTION_TYPES = new Set([
  'FunctionDeclaration',
  'FunctionExpression',
  'ArrowFunctionExpression',
]);

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let changed = false;

  root
    .find(j.ObjectPattern)
    .filter((path) => {
      // Only target function parameters, not variable destructuring
      if (!isFunctionParam(path)) return false;

      const typeAnnotation = (path.value as any).typeAnnotation;
      if (!typeAnnotation) return false;

      const annotation = typeAnnotation.typeAnnotation;

      // Skip if already Readonly<...>
      if (
        annotation.type === 'TSTypeReference' &&
        annotation.typeName?.type === 'Identifier' &&
        annotation.typeName.name === 'Readonly'
      ) {
        return false;
      }

      // Skip any / unknown — wrapping them is meaningless
      if (
        annotation.type === 'TSAnyKeyword' ||
        annotation.type === 'TSUnknownKeyword'
      ) {
        return false;
      }

      return true;
    })
    .forEach((path) => {
      const typeAnnotation = (path.value as any).typeAnnotation;
      const annotation = typeAnnotation.typeAnnotation;
      // Wrap the existing type in Readonly<ExistingType>
      typeAnnotation.typeAnnotation = j.tsTypeReference(
        j.identifier('Readonly'),
        j.tsTypeParameterInstantiation([annotation]),
      );
      changed = true;
    });

  return changed ? root.toSource() : undefined;
}

/** Walk up the AST to check if this ObjectPattern is a direct function parameter. */
function isFunctionParam(path: ASTPath): boolean {
  // path.parent is the params array, path.parent.parent is the function node
  const grandParent = path.parent?.parent?.node ?? path.parent?.parent?.value;
  if (grandParent && FUNCTION_TYPES.has(grandParent.type)) return true;

  // Fallback: walk up looking for a function node before hitting a statement
  let current = path.parent;
  while (current) {
    const type = current.node?.type ?? current.value?.type;
    if (FUNCTION_TYPES.has(type)) return true;
    // Stop walking if we hit a block/statement — the ObjectPattern is in the body, not params
    if (type === 'BlockStatement' || type === 'VariableDeclarator') return false;
    current = current.parent;
  }
  return false;
}
