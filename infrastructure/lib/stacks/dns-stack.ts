// infrastructure/lib/stacks/dns-stack.ts

import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import type { ResolvedEnvironmentConfig } from '../config/types';

export interface DnsStackProps extends cdk.StackProps {
  readonly envConfig: ResolvedEnvironmentConfig;
}

export class DnsStack extends cdk.Stack {
  public readonly certificate: acm.Certificate;
  public readonly hostedZone: route53.PublicHostedZone;

  constructor(scope: Construct, id: string, props: DnsStackProps) {
    super(scope, id, props);
    const { envConfig } = props;

    this.hostedZone = new route53.PublicHostedZone(this, 'HostedZone', {
      zoneName: envConfig.domainName,
    });
    this.hostedZone.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);

    this.certificate = new acm.Certificate(this, 'Certificate', {
      domainName: envConfig.domainName,
      subjectAlternativeNames: envConfig.alternateDomainNames,
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });

    new cdk.CfnOutput(this, 'HostedZoneId', {
      value: this.hostedZone.hostedZoneId,
    });

    new cdk.CfnOutput(this, 'NameServers', {
      value: cdk.Fn.join(',', this.hostedZone.hostedZoneNameServers!),
    });

    new cdk.CfnOutput(this, 'CertificateArn', {
      value: this.certificate.certificateArn,
    });
  }
}
