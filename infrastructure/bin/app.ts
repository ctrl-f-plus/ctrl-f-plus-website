#!/usr/bin/env node

// infrastructure/bin/app.ts

import * as cdk from 'aws-cdk-lib';
import {
  deriveStackName,
  loadAppContext,
  resolveEnvironmentConfig,
} from '../lib/config/site-config';
import { StaticSiteStack } from '../lib/stacks/static-site-stack';
import { HostedZoneStack } from '../lib/stacks/hosted-zone-stack';
import { CertificateStack } from '../lib/stacks/certificate-stack';

const app = new cdk.App();
const appContext = loadAppContext(app);
const targetEnv =
  app.node.tryGetContext('env') || process.env.CDK_ENV || 'prod';
const { environment, env, envConfig } = resolveEnvironmentConfig(
  appContext,
  targetEnv,
);
const stackName = deriveStackName(appContext.appName, environment);

cdk.Tags.of(app).add('Project', appContext.appName);
cdk.Tags.of(app).add('Environment', environment);
cdk.Tags.of(app).add('Repository', appContext.githubRepository);
cdk.Tags.of(app).add('ManagedBy', 'cdk');
cdk.Tags.of(app).add('Owner', 'ben');

const hostedZoneStack = new HostedZoneStack(app, `${stackName}-HostedZone`, {
  env: { account: env.account, region: envConfig.certificateRegion },
  crossRegionReferences: true,
  envConfig,
});

const certificateStack = new CertificateStack(app, `${stackName}-Certificate`, {
  env: { account: env.account, region: envConfig.certificateRegion },
  crossRegionReferences: true,
  envConfig,
  hostedZone: hostedZoneStack.hostedZone,
});

const siteStack = new StaticSiteStack(app, stackName, {
  env,
  crossRegionReferences: true,
  appName: appContext.appName,
  githubRepository: appContext.githubRepository,
  environment,
  envConfig,
  certificate: certificateStack.certificate,
  hostedZone: hostedZoneStack.hostedZone,
});

siteStack.addDependency(certificateStack);
