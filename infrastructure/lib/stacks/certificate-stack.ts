// infrastructure/lib/stacks/certificate-stack.ts

import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import type { ResolvedEnvironmentConfig } from '../config/types';

interface CertificateStackProps extends cdk.StackProps {
  readonly envConfig: ResolvedEnvironmentConfig;
  readonly hostedZone: route53.IHostedZone;
}

export class CertificateStack extends cdk.Stack {
  public readonly certificate: acm.Certificate;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);
    const { envConfig, hostedZone } = props;

    this.certificate = new acm.Certificate(this, 'Certificate', {
      domainName: envConfig.domainName,
      subjectAlternativeNames: envConfig.alternateDomainNames,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    new cdk.CfnOutput(this, 'CertificateArn', {
      value: this.certificate.certificateArn,
    });
  }
}
