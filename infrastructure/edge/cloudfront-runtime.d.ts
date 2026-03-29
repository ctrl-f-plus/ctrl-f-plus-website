declare module 'cloudfront' {
  interface KeyValueStoreHandle {
    get(
      key: string,
      options?: { format?: 'string' | 'json' | 'bytes' },
    ): Promise<string>;
    exists(key: string): Promise<boolean>;
    meta(): Promise<unknown>;
  }

  const cloudfront: {
    kvs(): KeyValueStoreHandle;
  };

  export default cloudfront;
}
