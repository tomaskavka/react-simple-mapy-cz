/* eslint-disable @typescript-eslint/ban-ts-comment */
import createCoords from './createCoords';

describe('createCoords', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'SMap', {
      value: {
        Coords: {
          fromWGS84: jest.fn(),
        },
      },
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // @ts-ignore
    delete window.SMap;
  });

  it('should pass latitute and longitude to SMap Coords', () => {
    createCoords({ lat: 50.0674706, lon: 14.4715394 });

    expect(window.SMap.Coords.fromWGS84).toHaveBeenCalledWith(14.4715394, 50.0674706);
  });
});
