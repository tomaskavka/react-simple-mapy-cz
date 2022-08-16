import { forceReRender } from '@storybook/react';
import React from 'react';
import Map from '../../../src/components/Map';

export default {
  title: 'Examples / Full API / Controls',
};

forceReRender();

export const Default = () => (
  <Map
    style={{ width: 400, height: 400 }}
    center={{ lat: 50.0674706, lon: 14.4715394 }}
    controls={{
      hasDefault: true,
    }}
  />
);

export const Compass = () => (
  <Map
    style={{ width: 400, height: 400 }}
    center={{ lat: 50.0674706, lon: 14.4715394 }}
    controls={{
      compass: {},
    }}
  />
);

export const Mouse = () => (
  <Map
    style={{ width: 400, height: 400 }}
    center={{ lat: 50.0674706, lon: 14.4715394 }}
    controls={{
      mouse: ['wheel', 'pan', 'zoom'],
    }}
  />
);

export const Keyboard = () => (
  <Map
    style={{ width: 400, height: 400 }}
    center={{ lat: 50.0674706, lon: 14.4715394 }}
    controls={{
      keyboard: ['zoom', 'pan'],
    }}
  />
);
