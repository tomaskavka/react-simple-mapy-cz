export type ApiVariantType = 'full' | 'simple';

export type ApiConfig = {
	key?: string;
	jak?: boolean;
	poi?: boolean;
	pano?: boolean;
	suggest?: boolean;
	api?: ApiVariantType;
};

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

	private static loadingPromise: Promise<void> | null = null;

	private static appendScript() {
		return new Promise<void>((resolve, reject) => {
			const el = document.createElement('script');

			el.type = 'text/javascript';
			el.src = 'https://api.mapy.cz/loader.js';
			el.onload = () => resolve();
			el.onerror = e => reject(e);

			document.head.appendChild(el);
		});
	}

	private static async runInitialLoad({ key = '', ...config }: ApiConfig) {
		return new Promise<void>(resolve => {
			window.Loader.async = true;
			window.Loader.load(key, { ...defaultApiConfig, ...config }, () => {
				resolve();
			});
		});
	}

	private static load(config: ApiConfig) {
		if (ApiLoader.loadingPromise === null) {
			ApiLoader.loadingPromise = new Promise<void>(async (resolve, reject) => {
				try {
					await ApiLoader.appendScript();
					await ApiLoader.runInitialLoad(config);

					resolve();
				} catch (e) {
					ApiLoader.status = Status.ERROR;

					reject(e);
				}
			});
		}

		return ApiLoader.loadingPromise;
	}

	static async init(config: ApiConfig = {}) {
		const { api } = config;

		if (ApiLoader.status === Status.READY) {
			return true;
		}

		return ApiLoader.load(config);
	}
}

export default ApiLoader;
