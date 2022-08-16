import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import Map from './Map';
import Api from '../services/Api';

jest.mock('../services/Api', () => ({
  loadMapIntoContainer: jest.fn().mockReturnValue(Promise.resolve()),
}));

class PromiseWithResolveAndReject<T> {
  public promise: Promise<T>;

  public resolve: ((value: T | PromiseLike<T>) => void) | undefined;

  public reject: (() => void) | undefined;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const setUpPromise = () => {
  const { promise, resolve } = new PromiseWithResolveAndReject();

  (Api.loadMapIntoContainer as jest.Mock).mockReturnValueOnce(promise);

  return resolve;
};

describe('Map', () => {
  it('should render default props', () => {
    render(<Map />);

    expect(Api.loadMapIntoContainer).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      apiConfig: undefined,
      center: undefined,
      controls: undefined,
      defaultLayer: undefined,
      markers: undefined,
      sync: undefined,
      zoom: undefined,
    });
  });

  it('should render with simple API', () => {
    render(<Map apiConfig={{ api: 'simple' }} />);

    expect(Api.loadMapIntoContainer).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      apiConfig: {
        api: 'simple',
      },
      center: undefined,
      controls: undefined,
      defaultLayer: undefined,
      markers: undefined,
      sync: undefined,
      zoom: undefined,
    });
  });

  it('should render with center', () => {
    render(<Map center={{ lat: 50, lon: 19 }} />);

    expect(Api.loadMapIntoContainer).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      apiConfig: undefined,
      center: { lat: 50, lon: 19 },
      controls: undefined,
      defaultLayer: undefined,
      markers: undefined,
      sync: undefined,
      zoom: undefined,
    });
  });

  it('should render with controls', () => {
    render(
      <Map
        controls={{
          hasDefault: true,
          mouse: ['wheel', 'pan', 'zoom'],
          keyboard: ['zoom', 'pan'],
        }}
      />
    );

    expect(Api.loadMapIntoContainer).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      apiConfig: undefined,
      center: undefined,
      controls: { hasDefault: true, mouse: ['wheel', 'pan', 'zoom'], keyboard: ['zoom', 'pan'] },
      defaultLayer: undefined,
      markers: undefined,
      sync: undefined,
      zoom: undefined,
    });
  });

  it('should render with defaultLayer', () => {
    render(<Map defaultLayer="HISTORIC" />);

    expect(Api.loadMapIntoContainer).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      apiConfig: undefined,
      center: undefined,
      controls: undefined,
      defaultLayer: 'HISTORIC',
      markers: undefined,
      sync: undefined,
      zoom: undefined,
    });
  });

  it('should render with markers', () => {
    render(<Map markers={[{ center: { lat: 50, lon: 19 }, name: 'Marker' }]} />);

    expect(Api.loadMapIntoContainer).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      apiConfig: undefined,
      center: undefined,
      controls: undefined,
      defaultLayer: undefined,
      markers: [{ center: { lat: 50, lon: 19 }, name: 'Marker' }],
      sync: undefined,
      zoom: undefined,
    });
  });

  it('should render with sync', () => {
    render(<Map sync={{ isEnabled: true }} />);

    expect(Api.loadMapIntoContainer).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      apiConfig: undefined,
      center: undefined,
      controls: undefined,
      defaultLayer: undefined,
      markers: undefined,
      sync: {
        isEnabled: true,
      },
      zoom: undefined,
    });
  });

  it('should render with zoom', () => {
    render(<Map zoom={19} />);

    expect(Api.loadMapIntoContainer).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      apiConfig: undefined,
      center: undefined,
      controls: undefined,
      defaultLayer: undefined,
      markers: undefined,
      sync: undefined,
      zoom: 19,
    });
  });

  it('should render with className', () => {
    const { container } = render(<Map className="testing-class" zoom={19} />);

    expect(container.querySelector('.testing-class')).toBeInTheDocument();
  });

  it('should call onLoad callback', async () => {
    const onLoadCallback = jest.fn();

    const resolve = setUpPromise();

    render(<Map onLoad={onLoadCallback} />);

    act(() => {
      if (resolve) {
        resolve({ map: 'map' });
      }
    });

    await waitFor(() => expect(onLoadCallback).toHaveBeenCalledWith({ map: 'map' }));
  });
});
