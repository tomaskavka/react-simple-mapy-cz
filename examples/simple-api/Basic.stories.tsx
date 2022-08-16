import React from 'react';
import { forceReRender } from '@storybook/react';
import Map from '../../src/components/Map';

export default {
  title: 'Examples / Simple API',
};

forceReRender();

export const Basic = () => (
  <Map
    style={{ width: 300, height: 300 }}
    center={{ lat: 50.0674706, lon: 14.4715394 }}
    apiConfig={{ api: 'simple' }}
  />
);
