import React, { useEffect, useState } from 'react';
import { forceReRender } from '@storybook/react';
import Map from '../src/components/Map';

export default {
  title: 'Examples / Mixed APIs',
};

forceReRender();

export const SimpleLoadedAndFullRequested = () => {
  const [isSecondLoaded, setSecondLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setSecondLoaded(true), 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Map
        style={{ width: 400, height: 400 }}
        center={{ lat: 50.0674706, lon: 14.4715394 }}
        controls={{ hasDefault: true }}
        apiConfig={{ api: 'simple' }}
      />
      {isSecondLoaded && (
        <Map
          style={{ width: 400, height: 400 }}
          center={{ lat: 50.0674706, lon: 14.4715394 }}
          controls={{ hasDefault: true }}
          apiConfig={{ api: 'full' }}
        />
      )}
    </>
  );
};

export const FullLoadedAndSimpleRequested = () => {
  const [isSecondLoaded, setSecondLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setSecondLoaded(true), 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Map
        style={{ width: 400, height: 400 }}
        center={{ lat: 50.0674706, lon: 14.4715394 }}
        apiConfig={{ api: 'full' }}
      />
      {isSecondLoaded && (
        <Map
          style={{ width: 400, height: 400 }}
          center={{ lat: 50.0674706, lon: 14.4715394 }}
          apiConfig={{ api: 'simple' }}
        />
      )}
    </>
  );
};
