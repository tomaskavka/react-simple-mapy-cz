import React from 'react';
import Map from '../src/components/Map';

export default {
	title: 'Examples',
};

export const MultipleMapsWithMixedAPIsError = () => (
  <>
    <Map
      style={{ width: 600, height: 600 }}
      center={{ lat: 50.0674706, lon: 14.4715394 }}
      apiConfig={{ api: 'simple' }}
    />
    <Map
      style={{ width: 600, height: 600 }}
      center={{ lat: 50.0674706, lon: 14.4715394 }}
      apiConfig={{ api: 'full' }}
    />
  </>
);
