import React, { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import Api, { MapConfig } from '../services/Api';
import type SimpleAPI from '../services/SimpleAPI';
import type FullAPI from '../services/FullAPI';

export interface MapProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onLoad'>, MapConfig {
  onLoad?: (
    result:
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
        }
  ) => void;
}

const Map: FunctionComponent<MapProps> = ({
  center,
  zoom,
  defaultLayer,
  sync,
  controls,
  markers,
  apiConfig,
  onLoad,
  ...rest
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && !isLoaded) {
      Api.loadMapIntoContainer(ref.current, {
        center,
        zoom,
        defaultLayer,
        sync,
        controls,
        markers,
        apiConfig,
      }).then(result => {
        setLoaded(true);

        if (onLoad) {
          onLoad(result);
        }
      });
    }
  }, [ref.current]);

  return <div ref={ref} {...rest} />;
};

export default Map;
