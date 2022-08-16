export {};

declare global {
  type SMapApiType = 'simple' | 'full';

  type SMapLoaderLoadWhatType = {
    jak?: boolean;
    poi?: boolean;
    pano?: boolean;
    suggest?: boolean;
    api?: SMapApiType;
  };

  interface SMapLoaderType {
    load(key?: string, what?: SMapLoaderLoadWhatType, callback?: () => void): void;
    async: boolean;
  }
}
