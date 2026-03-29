export type EnvironmentName = 'prod';

export interface EnvironmentConfig {
  readonly account: string;
  readonly region: string;
  readonly certificateRegion: string;
  readonly envName: EnvironmentName;
  readonly domainName: string;
  readonly alternateDomainNames: string[];
}

export interface ResolvedEnvironmentConfig extends EnvironmentConfig {
  readonly compiledEdgeAssetPath: string;
  readonly redirectsAssetPath: string;
}

export interface AppContext {
  readonly appName: string;
  readonly repository: string;
  readonly environments: Record<EnvironmentName, EnvironmentConfig>;
}
