// infrastructure/lib/stacks/hosted-zone-stack.ts

import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import type { ResolvedEnvironmentConfig } from '../config/types';

export interface HostedZoneStackProps extends cdk.StackProps {
  readonly envConfig: ResolvedEnvironmentConfig;
}

export class HostedZoneStack extends cdk.Stack {
  public readonly hostedZone: route53.PublicHostedZone;

  constructor(scope: Construct, id: string, props: HostedZoneStackProps) {
    super(scope, id, props);
    const { envConfig } = props;

    this.hostedZone = new route53.PublicHostedZone(this, 'HostedZone', {
      zoneName: envConfig.domainName,
    });
    this.hostedZone.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);

    new cdk.CfnOutput(this, 'HostedZoneId', {
      value: this.hostedZone.hostedZoneId,
    });

    new cdk.CfnOutput(this, 'NameServers', {
      value: cdk.Fn.join(',', this.hostedZone.hostedZoneNameServers!),
    });
  }
}
