/* eslint-disable @typescript-eslint/ban-ts-comment */
import FullAPI from './FullAPI';

jest.mock('../utils/createCoords', () =>
  jest.fn().mockImplementation(({ lat, lon }) => `${lat}, ${lon}`)
);

const mockEnableLayer = jest.fn();
const mockEnableMarkerLayer = jest.fn();
const mockAddMarker = jest.fn();

const map = {
  addDefaultLayer: jest.fn().mockReturnValue({ enable: mockEnableLayer }),
  addControl: jest.fn().mockImplementation(control => control),
  addDefaultControls: jest.fn(),
  addLayer: jest.fn(),
} as unknown as SMapMapType;

class mockSync {
  public name = 'Sync';

  public bottomSpace;

  constructor({ bottomSpace }: { bottomSpace?: number }) {
    this.bottomSpace = bottomSpace;
  }
}

class mockCompass {
  public name = 'Compass';
}

class mockMouse {
  public name = 'Mouse';
}

class mockKeyboard {
  public name = 'Keyboard';
}

class mockLayerMarker {
  public name = 'LayerMarker';

  public enable() {
    mockEnableMarkerLayer();
  }

  public addMarker() {
    mockAddMarker()();
  }
}

class mockMarker {
  public name;

  public center: string;

  public options: SMapMarkerOptionsType;

  constructor(center: string, name: string, options: SMapMarkerOptionsType) {
    this.center = center;
    this.name = name;
    this.options = options;
  }
}

describe('FullAPI', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'SMap', {
      value: {
        DEF_BASE: 'BASE',
        MOUSE_PAN: 'MOUSE_PAN',
        MOUSE_WHEEL: 'MOUSE_WHEEL',
        MOUSE_ZOOM: 'MOUSE_ZOOM',
        MOUSE_ZOOM_IN: 'MOUSE_ZOOM_IN',
        MOUSE_ZOOM_OUT: 'MOUSE_ZOOM_OUT',
        KB_PAN: 'KB_PAN',
        KB_ZOOM: 'KB_ZOOM',
        Control: {
          Sync: mockSync,
          Compass: mockCompass,
          Mouse: mockMouse,
          Keyboard: mockKeyboard,
        },
        Layer: {
          Marker: mockLayerMarker,
        },
        Marker: mockMarker,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // @ts-ignore
    delete window.SMap;
  });

  describe('Init', () => {
    it('should init with default config', () => {
      new FullAPI(map, {});

      expect(map.addDefaultLayer).toHaveBeenCalledWith('BASE');
      expect(mockEnableLayer).toHaveBeenCalled();
    });

    it('should init with sync', () => {
      new FullAPI(map, { sync: { isEnabled: true, bottom: 30 } });

      expect(map.addControl).toHaveBeenCalledWith({ bottomSpace: 30, name: 'Sync' });
    });

    describe('Controls', () => {
      it('should init with default controls', () => {
        new FullAPI(map, { controls: { hasDefault: true } });

        expect(map.addDefaultControls).toHaveBeenCalled();
      });

      it('should init with compass', () => {
        new FullAPI(map, { controls: { compass: {} } });

        expect(map.addControl).toHaveBeenCalledWith({ name: 'Compass' }, undefined);
      });

      it('should init with mouse without actions', () => {
        new FullAPI(map, { controls: { mouse: [] } });

        expect(map.addControl).toHaveBeenCalledWith({ name: 'Mouse' });
      });

      it('should init with mouse with actions', () => {
        new FullAPI(map, { controls: { mouse: ['pan', 'wheel', 'zoom', 'zoom-in', 'zoom-out'] } });

        expect(map.addControl).toHaveBeenCalledWith({ name: 'Mouse' });
      });

      it('should init with keyboard without actions', () => {
        new FullAPI(map, { controls: { keyboard: [] } });

        expect(map.addControl).toHaveBeenCalledWith({ name: 'Keyboard' });
      });

      it('should init with keyboard with actions', () => {
        new FullAPI(map, { controls: { keyboard: ['pan', 'zoom'] } });

        expect(map.addControl).toHaveBeenCalledWith({ name: 'Keyboard' });
      });
    });

    it('should init with markers', () => {
      new FullAPI(map, { markers: [{ center: { lat: 50, lon: 19 }, name: 'Testing name' }] });

      expect(map.addLayer).toHaveBeenCalledWith({ name: 'LayerMarker' });
      expect(mockEnableMarkerLayer).toHaveBeenCalled();
      expect(mockAddMarker).toHaveBeenCalledWith({
        center: '50, 19',
        name: 'Testing name',
        options: undefined,
      });
    });
  });

  it('should add marker', () => {
    const api = new FullAPI(map, {
      markers: [{ center: { lat: 50, lon: 19 }, name: 'First marker' }],
    });

    api.addMarker({ center: { lat: 49, lon: 20 }, name: 'Second marker' });

    expect(map.addLayer).toHaveBeenCalledTimes(1);
    expect(mockEnableMarkerLayer).toHaveBeenCalledTimes(1);
    expect(mockAddMarker).toHaveBeenCalledTimes(2);
    expect(mockAddMarker).toHaveBeenCalledWith({
      center: '50, 19',
      name: 'First marker',
      options: undefined,
    });
    expect(mockAddMarker).toHaveBeenCalledWith({
      center: '49, 20',
      name: 'Second marker',
      options: undefined,
    });
  });
});
