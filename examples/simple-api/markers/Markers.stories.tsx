import { forceReRender } from '@storybook/react';
import React, { useState } from 'react';
import Map from '../../../src/components/Map';
import type FullAPI from '../../../src/services/FullAPI';
import type SimpleAPI from '../../../src/services/SimpleAPI';

type LoadType =
  | {
      api: SimpleAPI;
      map: SMapMapType;
      Smap: SMapType;
      JAK: JAKType;
    }
  | {
      api: FullAPI;
      map: SMapMapType;
      Smap: SMapType;
      JAK: JAKType;
    };

export default {
  title: 'Examples / Simple API / Markers',
};

forceReRender();

export const OnLoad = () => (
  <Map
    style={{ width: 400, height: 400 }}
    center={{ lat: 50.0674706, lon: 14.4715394 }}
    markers={[
      {
        center: { lat: 50.0674706, lon: 14.4715394 },
        name: 'First marker',
      },
    ]}
    apiConfig={{ api: 'simple' }}
  />
);

export const AfterAction = () => {
  const [api, setApi] = useState<SimpleAPI | null>(null);
  const [hasSecondMarker, setSecondMarker] = useState(false);

  const handleLoad = ({ api }: LoadType) => {
    setApi(api as SimpleAPI);
  };

  const handleClick = () => {
    setSecondMarker(true);

    api?.addMarker({
      center: { lat: 50.0674706, lon: 14.4715394 },
      name: 'Second marker',
    });
  };

  return (
    <>
      <button type="button" onClick={handleClick} disabled={api === null || hasSecondMarker}>
        Add marker
      </button>
      <Map
        style={{ width: 400, height: 400 }}
        center={{ lat: 50.0674706, lon: 14.4715394 }}
        onLoad={handleLoad}
        apiConfig={{ api: 'simple' }}
      />
    </>
  );
};
