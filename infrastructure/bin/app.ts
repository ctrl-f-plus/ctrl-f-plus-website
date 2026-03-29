#!/usr/bin/env node

// infrastructure/bin/app.ts

import * as cdk from 'aws-cdk-lib';
import {
  deriveStackName,
  loadAppContext,
  resolveEnvironmentConfig,
} from '../lib/config/site-config';
import { DnsStack } from '../lib/stacks/dns-stack';
import { StaticSiteStack } from '../lib/stacks/static-site-stack';

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
cdk.Tags.of(app).add('Repository', appContext.repository);
cdk.Tags.of(app).add('ManagedBy', 'cdk');
cdk.Tags.of(app).add('Owner', 'ben');

const dnsStack = new DnsStack(app, `${stackName}-Dns`, {
  env: { account: env.account, region: envConfig.certificateRegion },
  crossRegionReferences: true,
  envConfig,
});

const siteStack = new StaticSiteStack(app, stackName, {
  env,
  crossRegionReferences: true,
  appName: appContext.appName,
  environment,
  envConfig,
  certificate: dnsStack.certificate,
  hostedZone: dnsStack.hostedZone,
});

siteStack.addDependency(dnsStack);
