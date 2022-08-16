export {};

declare global {
  interface Window {
    Loader: SMapLoaderType;
    SMap: SMapType;
    JAK: JAKType;
  }
}
