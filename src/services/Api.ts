import ApiLoader, { ApiConfig, ApiVariantType } from './ApiLoader';

type CoordsType = {
	lat: number;
	lon: number;
};

type LayerType =
	| 'BASE'
	| 'TURIST'
	| 'OPHOTO'
	| 'HYBRID'
	| 'HISTORIC'
	| 'OPHOTO0203'
	| 'OPHOTO0406'
	| 'OBLIQUE'
	| 'SMART_BASE'
	| 'SMART_OPHOTO'
	| 'SMART_TURIST'
	| 'RELIEF'
	| 'PANO'
	| 'TURIST_WINTER'
	| 'SMART_WINTER'
	| 'SMART_SUMMER'
	| 'GEOGRAPHY'
	| 'OPHOTO1012'
	| 'HYBRID_SPARSE'
	| 'OPHOTO1415'
	| 'OPHOTO1618';

type ControlsType = {
	hasDefault?: boolean;
	compass?: {
		title?: string;
		style?: Record<string, string | number>;
	};
	mouse?: ('pan' | 'wheel' | 'zoom' | 'zoom-in' | 'zoom-out')[];
	keyboard?: ('pan' | 'zoom')[];
};

type MarkerType = {
  center: CoordsType;
  name: string;
  options?: {
    prefetch?: number;
    supportsAnimation?: boolean;
    poiTooltip?: boolean;
  };
};

export type MapConfig = {
	center?: CoordsType;
	zoom?: number;
	defaultLayer?: LayerType;
	sync?: {
		isEnabled?: boolean;
		bottom?: number;
	};
	controls?: ControlsType;
  markers?: MarkerType[];
	apiConfig?: ApiConfig;
};

class Api {
  private static markersLayers: Record<string, any> = {};

	public static async loadMapIntoContainer(
		container: HTMLDivElement,
		{ apiConfig, ...config }: MapConfig = {}
	) {
		await ApiLoader.init(apiConfig);

		const {
			center = {
				lat: 50.0674706,
				lon: 14.4715394,
			},
			defaultLayer = 'BASE',
			zoom = 14,
			sync = { isEnabled: false },
			controls,
      markers = [],
		} = config;

		const map = Api.createMap(container, Api.createCoords(center), zoom);

		if (apiConfig?.api !== 'simple') {
			if (typeof map.addDefaultLayer === 'undefined') {
				Api.logMixingAPIsError('simple');
			} else {
				Api.addLayer(map, defaultLayer).enable();
			}
		} else {
			if (typeof map.addDefaultLayer !== 'undefined') {
				Api.logMixingAPIsError('full');
				Api.addLayer(map, defaultLayer).enable();
			}
		}

		if (sync.isEnabled) {
			Api.addSync(map, sync.bottom);
		}

		if (controls) {
			Api.addControls(map, controls);
		}

    if (markers) {
      Api.addMarkers(map, markers);
    }

    return map;
	}

	private static logMixingAPIsError = (loadedVariant: ApiVariantType) => {
		const full = 'Full';
		const simple = 'Simple';
		const loaded = loadedVariant === 'full' ? full : simple;
		const wanted = loadedVariant === 'simple' ? simple : full;

		console.error(
			`Map should be loaded with ${wanted} API but ${loaded} API is already loaded. Mixing APIs isn\'t supported by Mapy.cz API.`
		);
		console.info(`Map now uses ${loaded} API.`);
	};

	private static createCoords({ lat, lon }: CoordsType) {
		return window.SMap.Coords.fromWGS84(lon, lat);
	}

	private static createMap(container: HTMLDivElement, center: any, zoom: number) {
		return new window.SMap(window.JAK.gel(container), center, zoom);
	}

	private static addLayer(map: any, layer: string) {
		return map.addDefaultLayer(window.SMap[`DEF_${layer}`]);
	}

	private static addSync(map: any, bottomMargin?: number) {
		map.addControl(new window.SMap.Control.Sync({ bottomSpace: bottomMargin }));
	}

	private static addControls(map: any, { hasDefault, compass, mouse, keyboard }: ControlsType) {
		if (hasDefault) {
			map.addDefaultControls();
		}

		if (compass) {
			map.addControl(new window.SMap.Control.Compass({ title: compass.title }), compass.style);
		}

		if (mouse) {
			map.addControl(
				new window.SMap.Control.Mouse(
					(mouse.includes('pan') ? window.SMap.MOUSE_PAN : 0)
          + (mouse.includes('wheel') ? window.SMap.MOUSE_WHEEL	: 0)
          + (mouse.includes('zoom') ? window.SMap.MOUSE_ZOOM	: 0)
          + (mouse.includes('zoom-in') ? window.SMap.MOUSE_ZOOM_IN	: 0)
          + (mouse.includes('zoom-out') ? window.SMap.MOUSE_ZOOM_OUT	: 0)
				)
			);
		}

		if (keyboard) {
			map.addControl(
				new window.SMap.Control.Keyboard(
					(keyboard.includes('pan') ? window.SMap.KB_PAN : 0)
          + (keyboard.includes('zoom') ? window.SMap.KB_ZOOM	: 0)
				)
			);
		}
	}

  private static getMarkersLayer(map: any, layerName: string) {
    if (typeof Api.markersLayers[layerName] === 'undefined') {
      const layer = new window.SMap.Layer.Marker();
      map.addLayer(layer);
      layer.enable();

      Api.markersLayers[layerName] = layer;
    }

    return Api.markersLayers[layerName];
  }

  private static addMarkers(map: any, markers: MarkerType[], layerName = 'default') {
    const layer = Api.getMarkersLayer(map, layerName);

    markers.forEach(({ center, name, options }) => {
      layer.addMarker(new window.SMap.Marker(Api.createCoords(center), name, options));
    });
  }

  public static addMarkerToLayer(map: any, { center, name, options }: MarkerType, layerName = 'default') {
    const layer = Api.getMarkersLayer(map, layerName);

    layer.addMarker(new window.SMap.Marker(Api.createCoords(center), name, options));
  }
}

export default Api;
