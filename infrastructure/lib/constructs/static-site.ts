// infrastructure/lib/constructs/static-site.ts

import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import type {
  EnvironmentName,
  ResolvedEnvironmentConfig,
} from '../config/types';
import { CloudFrontRouting } from './cloudfront-routing';

export interface StaticSiteProps {
  readonly appName: string;
  readonly environment: EnvironmentName;
  readonly envConfig: ResolvedEnvironmentConfig;
  readonly certificate: acm.ICertificate;
  readonly hostedZone: route53.IHostedZone;
}

export class StaticSite extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;
  public readonly hostedZone: route53.IHostedZone;

  constructor(scope: Construct, id: string, props: StaticSiteProps) {
    super(scope, id);

    const { appName, environment, envConfig, certificate, hostedZone } = props;
    const {
      alternateDomainNames,
      compiledEdgeAssetPath,
      domainName,
      redirectsAssetPath,
    } = envConfig;

    this.bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: `${appName}-${environment}-site`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    this.hostedZone = hostedZone;

    const routing = new CloudFrontRouting(this, 'CloudFrontRouting', {
      appName,
      environment,
      domainName,
      compiledEdgeAssetPath,
      redirectsAssetPath,
    });

    const responseHeadersPolicy = new cloudfront.ResponseHeadersPolicy(
      this,
      'SecurityHeaders',
      {
        securityHeadersBehavior: {
          contentSecurityPolicy: {
            contentSecurityPolicy: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://www.youtube.com",
              'frame-src youtube.com www.youtube.com',
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "media-src 'none'",
              "connect-src 'self' https://static.cloudflareinsights.com https://cloudflareinsights.com",
              "font-src 'self'",
            ].join('; '),
            override: true,
          },
          strictTransportSecurity: {
            accessControlMaxAge: cdk.Duration.seconds(63072000),
            includeSubdomains: true,
            preload: true,
            override: true,
          },
          contentTypeOptions: { override: true },
          frameOptions: {
            frameOption: cloudfront.HeadersFrameOption.DENY,
            override: true,
          },
          referrerPolicy: {
            referrerPolicy:
              cloudfront.HeadersReferrerPolicy.ORIGIN_WHEN_CROSS_ORIGIN,
            override: true,
          },
          xssProtection: {
            protection: true,
            modeBlock: true,
            override: true,
          },
        },
        customHeadersBehavior: {
          customHeaders: [
            {
              header: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()',
              override: true,
            },
            {
              header: 'X-DNS-Prefetch-Control',
              value: 'on',
              override: true,
            },
          ],
        },
      },
    );

    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: routing.viewerRequestFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
        responseHeadersPolicy,
      },
      domainNames: [domainName, ...alternateDomainNames],
      certificate,
      defaultRootObject: 'index.html',
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
    });

    const distributionTarget = route53.RecordTarget.fromAlias(
      new targets.CloudFrontTarget(this.distribution),
    );

    const apexARecord = new route53.ARecord(this, 'ARecord', {
      zone: this.hostedZone,
      target: distributionTarget,
    });
    apexARecord.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);

    const apexAaaaRecord = new route53.AaaaRecord(this, 'AAAARecord', {
      zone: this.hostedZone,
      target: distributionTarget,
    });
    apexAaaaRecord.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);

    for (let index = 0; index < alternateDomainNames.length; index += 1) {
      const alternateDomainName = alternateDomainNames[index];
      const recordName = this.getRecordName(alternateDomainName, domainName);

      const alternateARecord = new route53.ARecord(
        this,
        `AlternateARecord${index}`,
        {
          zone: this.hostedZone,
          recordName,
          target: distributionTarget,
        },
      );
      alternateARecord.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);

      const alternateAaaaRecord = new route53.AaaaRecord(
        this,
        `AlternateAAAARecord${index}`,
        {
          zone: this.hostedZone,
          recordName,
          target: distributionTarget,
        },
      );
      alternateAaaaRecord.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);
    }
  }

  private getRecordName(
    fullDomainName: string,
    rootDomainName: string,
  ): string {
    const suffix = `.${rootDomainName}`;

    if (!fullDomainName.endsWith(suffix)) {
      throw new Error(
        `Alternate domain "${fullDomainName}" must end with ".${rootDomainName}"`,
      );
    }

    return fullDomainName.slice(0, -suffix.length);
  }
}
