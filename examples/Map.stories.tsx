import React from 'react';
import Map from '../src/components/Map';

export default {
	title: 'Examples',
};

export const MapWithFullAPI = () => (
		<Map
			style={{ width: 500, height: 500 }}
			center={{ lat: 50.0674706, lon: 14.4715394 }}
      sync={{ isEnabled: true }}
      controls={{
        mouse: ['wheel', 'pan', 'zoom'],
        keyboard: ['zoom', 'pan']
      }}
      markers={[{
        center: { lat: 50.0674706, lon: 14.4715394 },
        name: 'First marker',
      }]}
		/>
);
