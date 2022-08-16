export type ApiVariantType = 'full' | 'simple';

export type ApiConfigType = {
  key?: string;
  jak?: boolean;
  poi?: boolean;
  pano?: boolean;
  suggest?: boolean;
  api?: ApiVariantType;
};

interface ApiConfigWithDefinedVariantType extends ApiConfigType {
  api: ApiVariantType;
}

enum Status {
  IDLE,
  LOADING,
  READY,
  ERROR,
}

const defaultApiConfig = {
  jak: true,
  poi: false,
  pano: false,
  suggest: false,
  api: 'full',
};

class ApiLoader {
  private static status = Status.IDLE;

  public static loadedApiVariant: ApiVariantType | null = null;

  private static loadingPromise: Promise<void> | null = null;

  private static checkConcurrentLoad(api: ApiVariantType) {
    if (api !== 'full' && this.loadedApiVariant !== api) {
      return this.loadingPromise;
    }

    return null;
  }

  private static appendScript(api: ApiVariantType) {
    return (
      ApiLoader.checkConcurrentLoad(api) ||
      new Promise<void>((resolve, reject) => {
        const el = document.createElement('script');

        el.type = 'text/javascript';
        el.src = 'https://api.mapy.cz/loader.js';
        el.onload = () => resolve();
        el.onerror = e => reject(e);

        document.head.appendChild(el);
      })
    );
  }

  private static async runInitialLoad({ key = '', api, ...rest }: ApiConfigWithDefinedVariantType) {
    return (
      ApiLoader.checkConcurrentLoad(api) ||
      new Promise<void>((resolve, reject) => {
        try {
          window.Loader.async = true;
          window.Loader.load(key, { ...defaultApiConfig, api, ...rest }, resolve);
        } catch (e) {
          reject(e);
        }
      })
    );
  }

  private static load({ api, ...rest }: ApiConfigWithDefinedVariantType) {
    if (ApiLoader.loadingPromise === null) {
      ApiLoader.loadingPromise = new Promise<void>((resolve, reject) => {
        ApiLoader.appendScript(api)
          .then(() => ApiLoader.runInitialLoad({ api, ...rest }))
          .then(() => {
            ApiLoader.status = Status.READY;

            resolve();
          })
          .catch(e => {
            ApiLoader.status = Status.ERROR;

            reject(e);
          });
      });
    }

    return ApiLoader.loadingPromise;
  }

  private static clean() {
    window.SMap = null as unknown as SMapType;

    document.head.querySelectorAll('script[src^="https://api.mapy.cz/loader"]').forEach(el => {
      el.remove();
    });

    ApiLoader.loadingPromise = null;
  }

  static async init({ api = 'full', ...rest }: ApiConfigType = {}) {
    if (
      ApiLoader.status === Status.READY &&
      (ApiLoader.loadedApiVariant === 'full' || ApiLoader.loadedApiVariant === api)
    ) {
      return true;
    }

    if (ApiLoader.loadedApiVariant !== null) {
      ApiLoader.clean();
    }

    ApiLoader.loadedApiVariant = api;
    ApiLoader.status = Status.LOADING;

    return ApiLoader.load({ api, ...rest });
  }
}

export default ApiLoader;
