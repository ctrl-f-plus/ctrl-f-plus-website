// ============================================
//                  IMPORTS
// ============================================

import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import type {
  AppContext,
  EnvironmentConfig,
  EnvironmentName,
  ResolvedEnvironmentConfig,
} from './types';

// ============================================
//               PATH CONSTANTS
// ============================================

const infrastructureRoot = process.cwd();

// ============================================
//             NAMING HELPERS
// ============================================

export function toPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

export function deriveStackName(
  appName: string,
  environment: EnvironmentName,
): string {
  const pascalEnv = environment.charAt(0).toUpperCase() + environment.slice(1);

  return `${toPascalCase(appName)}-${pascalEnv}`;
}

// ============================================
//                TYPE GUARDS
// ============================================

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// ============================================
//             PARSING HELPERS
// ============================================

function readString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(
      `Expected CDK context field "${fieldName}" to be a non-empty string.`,
    );
  }

  return value;
}

function readStringArray(value: unknown, fieldName: string): string[] {
  if (
    !Array.isArray(value) ||
    !value.every((item) => typeof item === 'string')
  ) {
    throw new Error(
      `Expected CDK context field "${fieldName}" to be an array of strings.`,
    );
  }

  return value;
}

function readEnvironmentName(
  value: unknown,
  fieldName: string,
): EnvironmentName {
  const envName = readString(value, fieldName);

  if (envName !== 'prod') {
    throw new Error(
      `Unsupported environment "${envName}" in CDK context field "${fieldName}".`,
    );
  }

  return envName;
}

function resolveContextValue(
  value: string,
  placeholder:
    | '${CDK_DEFAULT_ACCOUNT}'
    | '${CDK_DEFAULT_REGION}'
    | '${CLOUDFRONT_CERTIFICATE_REGION}',
  envValue: string | undefined,
): string {
  if (value !== placeholder) {
    return value;
  }

  if (!envValue) {
    throw new Error(
      `CDK context value "${placeholder}" could not be resolved from the current environment.`,
    );
  }

  return envValue;
}

function parseEnvironmentConfig(
  environmentName: string,
  value: unknown,
): EnvironmentConfig {
  if (!isRecord(value)) {
    throw new Error(
      `Expected CDK context field "environments.${environmentName}" to be an object.`,
    );
  }

  return {
    account: readString(
      value.account,
      `environments.${environmentName}.account`,
    ),
    region: readString(value.region, `environments.${environmentName}.region`),
    certificateRegion: readString(
      value.certificateRegion,
      `environments.${environmentName}.certificateRegion`,
    ),
    envName: readEnvironmentName(
      value.envName,
      `environments.${environmentName}.envName`,
    ),
    domainName: readString(
      value.domainName,
      `environments.${environmentName}.domainName`,
    ),
    alternateDomainNames: readStringArray(
      value.alternateDomainNames,
      `environments.${environmentName}.alternateDomainNames`,
    ),
  };
}

// ============================================
//              CONTEXT LOADERS
// ============================================

export function loadAppContext(app: cdk.App): AppContext {
  const appName = app.node.tryGetContext('appName');
  const repository = app.node.tryGetContext('repository');
  const environments = app.node.tryGetContext('environments');

  if (!isRecord(environments)) {
    throw new Error(
      'Expected CDK context field "environments" to be an object.',
    );
  }

  return {
    appName: readString(appName, 'appName'),
    repository: readString(repository, 'repository'),
    environments: {
      prod: parseEnvironmentConfig('prod', environments.prod),
    },
  };
}

// ============================================
//           ENVIRONMENT RESOLUTION
// ============================================

export function resolveEnvironmentConfig(
  appContext: AppContext,
  targetEnv: string,
): {
  readonly environment: EnvironmentName;
  readonly env: cdk.Environment;
  readonly envConfig: ResolvedEnvironmentConfig;
} {
  if (targetEnv !== 'prod') {
    throw new Error(
      `Environment "${targetEnv}" not found in context. Available environments: ${Object.keys(appContext.environments).join(', ')}`,
    );
  }

  const baseEnvConfig = appContext.environments[targetEnv];

  if (!baseEnvConfig) {
    throw new Error(
      `Environment "${targetEnv}" not found in context. Available environments: ${Object.keys(appContext.environments).join(', ')}`,
    );
  }

  const account = resolveContextValue(
    baseEnvConfig.account,
    '${CDK_DEFAULT_ACCOUNT}',
    process.env.CDK_DEFAULT_ACCOUNT,
  );
  const region = resolveContextValue(
    baseEnvConfig.region,
    '${CDK_DEFAULT_REGION}',
    process.env.CDK_DEFAULT_REGION,
  );
  const certificateRegion = resolveContextValue(
    baseEnvConfig.certificateRegion,
    '${CLOUDFRONT_CERTIFICATE_REGION}',
    process.env.CLOUDFRONT_CERTIFICATE_REGION,
  );

  return {
    environment: baseEnvConfig.envName,
    env: { account, region },
    envConfig: {
      ...baseEnvConfig,
      account,
      region,
      certificateRegion,
      compiledEdgeAssetPath: path.join(
        infrastructureRoot,
        'dist',
        'cloudfront',
        'viewer-request.handler.js',
      ),
      redirectsAssetPath: path.join(
        infrastructureRoot,
        'assets',
        'cloudfront',
        'redirects.json',
      ),
    },
  };
}
