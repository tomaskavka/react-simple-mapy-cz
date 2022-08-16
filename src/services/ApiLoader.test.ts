/* eslint-disable @typescript-eslint/no-var-requires */
import { waitFor } from '@testing-library/react';

jest.mock('../services/Api', () => ({
  loadMapIntoContainer: jest.fn().mockReturnValue(Promise.resolve({ map: 'map' })),
}));

let appendSpy: jest.SpyInstance;

describe('ApiLoader', () => {
  beforeEach(() => {
    appendSpy = jest.spyOn(document.head, 'appendChild');

    window.Loader = {
      load: jest.fn(),
      async: false,
    };
  });

  afterEach(() => {
    appendSpy.mockReset();
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('Init', () => {
    it('should init for first time', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let ApiLoader: any;

      jest.isolateModules(() => {
        ApiLoader = require('./ApiLoader').default;
      });

      const initPromise = ApiLoader.init();

      const scriptEl = appendSpy.mock.calls[0][0] as unknown as HTMLScriptElement;

      expect(scriptEl.tagName.toLowerCase()).toBe('script');
      expect(scriptEl.tagName.toLowerCase()).toBe('script');
      expect(scriptEl.src).toBe('https://api.mapy.cz/loader.js');
      expect(scriptEl.type).toBe('text/javascript');

      scriptEl.dispatchEvent(new Event('load'));

      await waitFor(() => expect(window.Loader.load).toHaveBeenCalledTimes(1));

      const [key, config, cb] = (window.Loader.load as jest.Mock).mock.calls[0];

      expect(key).toBe('');
      expect(config).toEqual({
        api: 'full',
        jak: true,
        pano: false,
        poi: false,
        suggest: false,
      });
      expect(cb).toBeInstanceOf(Function);
      expect(initPromise).resolves.toBe('');
    });

    it('should init and for second time only return true', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let ApiLoader: any;

      jest.isolateModules(() => {
        ApiLoader = require('./ApiLoader').default;
      });

      const firstInitPromise = ApiLoader.init({ api: 'simple' });

      const scriptEl = appendSpy.mock.calls[0][0] as unknown as HTMLScriptElement;

      scriptEl.dispatchEvent(new Event('load'));

      await waitFor(() => expect(window.Loader.load).toHaveBeenCalledTimes(1));

      const [, , cb] = (window.Loader.load as jest.Mock).mock.calls[0];

      cb();

      await waitFor(() => expect(firstInitPromise).resolves.toBeUndefined());

      const secondInitPromise = ApiLoader.init({ api: 'simple' });

      expect(secondInitPromise).resolves.toBeTruthy();
    });

    it('should init and for second time only return previous promise for concurrent inits', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let ApiLoader: any;

      jest.isolateModules(() => {
        ApiLoader = require('./ApiLoader').default;
      });

      const firstInitPromise = ApiLoader.init({ api: 'simple' }) as Promise<string>;
      const secondInitPromise = ApiLoader.init() as Promise<string>;

      appendSpy.mock.calls.forEach(([scriptEl]) => {
        scriptEl.dispatchEvent(new Event('load'));
      });

      await waitFor(() => expect(window.Loader.load).toHaveBeenCalledTimes(1));

      const [, , cb] = (window.Loader.load as jest.Mock).mock.calls[0];

      cb();

      const firstResolvedPromise = await Promise.race(
        [firstInitPromise, secondInitPromise].map((p, index) => p.then(() => index))
      );

      expect(firstResolvedPromise).toBe(1);
    });

    describe('Errors', () => {
      it('should handle loader loading error', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let ApiLoader: any;

        jest.isolateModules(() => {
          ApiLoader = require('./ApiLoader').default;
        });

        const initPromise = ApiLoader.init();

        const scriptEl = appendSpy.mock.calls[0][0] as unknown as HTMLScriptElement;

        expect(scriptEl.tagName.toLowerCase()).toBe('script');
        expect(scriptEl.tagName.toLowerCase()).toBe('script');
        expect(scriptEl.src).toBe('https://api.mapy.cz/loader.js');
        expect(scriptEl.type).toBe('text/javascript');

        scriptEl.dispatchEvent(new Event('error'));

        expect(initPromise).rejects.toBeInstanceOf(Event);
      });

      it('should handle loader load function error', async () => {
        (window.Loader.load as jest.Mock).mockImplementationOnce(() => {
          throw new Error('Test error');
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let ApiLoader: any;

        jest.isolateModules(() => {
          ApiLoader = require('./ApiLoader').default;
        });

        const initPromise = ApiLoader.init();

        const scriptEl = appendSpy.mock.calls[0][0] as unknown as HTMLScriptElement;

        expect(scriptEl.tagName.toLowerCase()).toBe('script');
        expect(scriptEl.tagName.toLowerCase()).toBe('script');
        expect(scriptEl.src).toBe('https://api.mapy.cz/loader.js');
        expect(scriptEl.type).toBe('text/javascript');

        scriptEl.dispatchEvent(new Event('load'));

        expect(initPromise).rejects.toBeInstanceOf(Error);
      });
    });
  });
});
