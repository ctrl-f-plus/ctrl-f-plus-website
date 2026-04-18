import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
import type { EnvironmentName } from '../config/types';

export interface CloudFrontRoutingProps {
  readonly appName: string;
  readonly environment: EnvironmentName;
  readonly domainName: string;
  readonly compiledEdgeAssetPath: string;
  readonly redirectsAssetPath: string;
}

export class CloudFrontRouting extends Construct {
  public readonly redirectStore: cloudfront.KeyValueStore;
  public readonly viewerRequestFunction: cloudfront.Function;

  constructor(scope: Construct, id: string, props: CloudFrontRoutingProps) {
    super(scope, id);
    const {
      appName,
      compiledEdgeAssetPath,
      domainName,
      environment,
      redirectsAssetPath,
    } = props;

    this.redirectStore = new cloudfront.KeyValueStore(this, 'RedirectStore', {
      comment: `Redirects for ${appName} (${environment}) - ${domainName}`,
      source: cloudfront.ImportSource.fromAsset(redirectsAssetPath),
    });

    this.viewerRequestFunction = new cloudfront.Function(
      this,
      'ViewerRequestFunction',
      {
        code: cloudfront.FunctionCode.fromFile({
          filePath: compiledEdgeAssetPath,
        }),
        // CloudFront KeyValueStore requires the JS_2_0 runtime.
        runtime: cloudfront.FunctionRuntime.JS_2_0,
        keyValueStore: this.redirectStore,
      },
    );
  }
}
