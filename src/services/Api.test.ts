/* eslint-disable @typescript-eslint/ban-ts-comment */
import Api from './Api';
import ApiLoader from './ApiLoader';
import FullAPI from './FullAPI';
import SimpleAPI from './SimpleAPI';

jest.mock('./ApiLoader', () => ({
  init: jest.fn().mockReturnValue(Promise.resolve()),
  loadedApiVariant: null,
}));

jest.mock('./SimpleAPI', () => jest.fn().mockReturnValue(Promise.resolve({ map: 'map' })));

jest.mock('./FullAPI', () => jest.fn().mockReturnValue(Promise.resolve({ map: 'map' })));

jest.mock('../utils/createCoords', () =>
  jest.fn().mockImplementation(({ lat, lon }) => `${lat}, ${lon}`)
);

describe('Api', () => {
  let consoleInfoSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleInfoSpy = jest.spyOn(console, 'info').mockReturnValue();

    Object.defineProperty(window, 'SMap', {
      value: jest.fn(),
    });

    Object.defineProperty(window, 'JAK', {
      value: {
        gel: jest.fn().mockReturnValue({ container: 'map' }),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleInfoSpy.mockRestore();
    // @ts-ignore
    delete window.SMap;
    // @ts-ignore
    delete window.JAK;
  });

  describe('loadMapIntoContainer', () => {
    it('should load map with Simple API', async () => {
      const result = await Api.loadMapIntoContainer({} as HTMLDivElement, {
        apiConfig: { api: 'simple' },
      });

      expect(window.JAK.gel).toHaveBeenCalledWith({});
      expect(window.SMap).toHaveBeenCalledWith({ container: 'map' }, '50.0674706, 14.4715394', 14);
      expect(SimpleAPI).toHaveBeenCalledWith({}, { markers: [] });
      expect(Object.keys(result)).toEqual(['map', 'Smap', 'JAK', 'api']);
    });

    it('should load map with Full API', async () => {
      const result = await Api.loadMapIntoContainer({} as HTMLDivElement, {
        apiConfig: { api: 'full' },
      });

      expect(window.JAK.gel).toHaveBeenCalledWith({});
      expect(window.SMap).toHaveBeenCalledWith({ container: 'map' }, '50.0674706, 14.4715394', 14);
      expect(FullAPI).toHaveBeenCalledWith(
        {},
        {
          controls: undefined,
          defaultLayer: 'BASE',
          markers: [],
          sync: {
            isEnabled: false,
          },
        }
      );
      expect(Object.keys(result)).toEqual(['map', 'Smap', 'JAK', 'api']);
    });

    it('should load map with default API value (Full)', async () => {
      await Api.loadMapIntoContainer({} as HTMLDivElement);

      expect(FullAPI).toHaveBeenCalled();
    });

    describe('API\'s mixing', () => {
      it('should handle loading Simple API and than Full API', async () => {
        await Api.loadMapIntoContainer({} as HTMLDivElement, { apiConfig: { api: 'simple' } });
        ApiLoader.loadedApiVariant = 'simple';
        await Api.loadMapIntoContainer({} as HTMLDivElement, { apiConfig: { api: 'full' } });

        expect(SimpleAPI).toHaveBeenCalled();
        expect(FullAPI).toHaveBeenCalled();
      });

      it('should handle loading Full API and than Simple API', async () => {
        await Api.loadMapIntoContainer({} as HTMLDivElement, { apiConfig: { api: 'full' } });
        ApiLoader.loadedApiVariant = 'full';
        await Api.loadMapIntoContainer({} as HTMLDivElement, { apiConfig: { api: 'simple' } });

        expect(consoleInfoSpy as jest.SpyInstance).toHaveBeenCalledWith(
          'Map should be loaded with Simple API but Full API is already loaded so map now uses Full API.'
        );
        expect(SimpleAPI).not.toHaveBeenCalled();
        expect(FullAPI).toHaveBeenCalled();
      });
    });
  });
});
