// infrastructure/lib/stacks/static-site-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as iam from 'aws-cdk-lib/aws-iam';
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
  readonly githubRepository: string;
  readonly environment: EnvironmentName;
  readonly envConfig: ResolvedEnvironmentConfig;
  readonly certificate: acm.ICertificate;
  readonly hostedZone: route53.IHostedZone;
}

export class StaticSiteStack extends cdk.Stack {
  public readonly site: StaticSite;

  constructor(scope: Construct, id: string, props: StaticSiteStackProps) {
    super(scope, id, props);
    const {
      appName,
      githubRepository,
      environment,
      envConfig,
      certificate,
      hostedZone,
    } = props;

    this.site = new StaticSite(this, toPascalCase(appName), {
      appName,
      environment,
      envConfig,
      certificate,
      hostedZone,
    });

    const githubOidcProvider =
      iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
        this,
        'GitHubOidcProvider',
        this.formatArn({
          service: 'iam',
          region: '',
          resource: 'oidc-provider',
          resourceName: 'token.actions.githubusercontent.com',
          arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
        }),
      );

    const githubActionsDeployRole = new iam.Role(
      this,
      'GitHubActionsDeployRole',
      {
        roleName: `${appName}-${environment}-github-actions-deploy`,
        description: `Deploy static assets for ${githubRepository} from GitHub Actions`,
        maxSessionDuration: cdk.Duration.hours(1),
        assumedBy: new iam.OpenIdConnectPrincipal(
          githubOidcProvider,
        ).withConditions({
          StringEquals: {
            'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
            'token.actions.githubusercontent.com:sub': `repo:${githubRepository}:ref:refs/heads/master`,
          },
        }),
      },
    );

    githubActionsDeployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudformation:DescribeStacks'],
        resources: [
          this.formatArn({
            service: 'cloudformation',
            resource: 'stack',
            resourceName: `${this.stackName}/*`,
            arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
          }),
        ],
      }),
    );

    githubActionsDeployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          's3:GetBucketLocation',
          's3:ListBucket',
          's3:ListBucketMultipartUploads',
        ],
        resources: [this.site.bucket.bucketArn],
      }),
    );

    githubActionsDeployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          's3:GetObject',
          's3:PutObject',
          's3:DeleteObject',
          's3:AbortMultipartUpload',
          's3:ListMultipartUploadParts',
        ],
        resources: [this.site.bucket.arnForObjects('*')],
      }),
    );

    githubActionsDeployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudfront:CreateInvalidation'],
        resources: [
          this.formatArn({
            service: 'cloudfront',
            region: '',
            resource: 'distribution',
            resourceName: this.site.distribution.distributionId,
            arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
          }),
        ],
      }),
    );

    new cdk.CfnOutput(this, 'BucketName', {
      value: this.site.bucket.bucketName,
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.site.distribution.distributionId,
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: this.site.distribution.distributionDomainName,
    });

    new cdk.CfnOutput(this, 'GitHubActionsDeployRoleArn', {
      value: githubActionsDeployRole.roleArn,
    });
  }
}
