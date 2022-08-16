import SimpleAPI from './SimpleAPI';

jest.mock('../utils/createCoords', () =>
  jest.fn().mockImplementation(({ lat, lon }) => `${lat}, ${lon}`)
);

const map = {
  addMarker: jest.fn(),
} as unknown as SMapMapType;

describe('SimpleAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add markers on init', () => {
    new SimpleAPI(map, { markers: [{ center: { lat: 18, lon: 92 }, name: 'Testing name' }] });

    expect(map.addMarker).toHaveBeenCalledWith('18, 92');
  });

  it('should add marker after init', () => {
    const api = new SimpleAPI(map, {});

    api.addMarker({ center: { lat: 18.92, lon: 92.18 }, name: 'Testing name' });

    expect(map.addMarker).toHaveBeenCalledWith('18.92, 92.18');
  });

  it('should add markers after init', () => {
    const api = new SimpleAPI(map, {});

    api.addMarkers([
      { center: { lat: 18.92, lon: 92.18 }, name: 'Testing name 1' },
      { center: { lat: 92.18, lon: 18.92 }, name: 'Testing name 2' },
    ]);

    expect(map.addMarker).toHaveBeenCalledWith('18.92, 92.18');
    expect(map.addMarker).toHaveBeenCalledWith('92.18, 18.92');
  });
});
