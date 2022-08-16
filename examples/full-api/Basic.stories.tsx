import { forceReRender } from '@storybook/react';
import React from 'react';
import Map from '../../src/components/Map';

export default {
  title: 'Examples / Full API',
};

forceReRender();

export const Basic = () => (
  <Map style={{ width: 400, height: 400 }} center={{ lat: 50.0674706, lon: 14.4715394 }} />
);
