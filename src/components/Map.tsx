import React, { FunctionComponent, HTMLAttributes, useEffect, useRef } from 'react';
import Api, { MapConfig } from '../services/Api';

interface MapProps extends HTMLAttributes<HTMLDivElement>, MapConfig {}

const Map: FunctionComponent<MapProps> = ({ center, zoom, defaultLayer, sync, controls, markers, apiConfig, ...rest }) => {
	const map = useRef<any>(null);
  const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
      Api.loadMapIntoContainer(ref.current, {
        center,
        zoom,
        defaultLayer,
        sync,
        controls,
        markers,
        apiConfig,
      }).then((newMap: any) => map.current = newMap);
		}
	}, [ref.current]);

	return <div ref={ref} {...rest} />;
};

export default Map;
