// infrastructure/lib/stacks/static-site-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { toPascalCase } from '../config/site-config';
import type {
  EnvironmentName,
  ResolvedEnvironmentConfig,
} from '../config/types';
import { StaticSite } from '../constructs/static-site';

export interface StaticSiteStackProps extends cdk.StackProps {
  readonly appName: string;
  readonly environment: EnvironmentName;
  readonly envConfig: ResolvedEnvironmentConfig;
  readonly certificate: acm.ICertificate;
  readonly hostedZone: route53.IHostedZone;
}

export class StaticSiteStack extends cdk.Stack {
  public readonly site: StaticSite;

  constructor(scope: Construct, id: string, props: StaticSiteStackProps) {
    super(scope, id, props);
    const { appName, environment, envConfig, certificate, hostedZone } = props;

    this.site = new StaticSite(this, toPascalCase(appName), {
      appName,
      environment,
      envConfig,
      certificate,
      hostedZone,
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: this.site.bucket.bucketName,
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.site.distribution.distributionId,
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: this.site.distribution.distributionDomainName,
    });
  }
}
