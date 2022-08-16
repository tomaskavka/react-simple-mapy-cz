import ApiLoader, { ApiConfigType } from './ApiLoader';
import createCoords from '../utils/createCoords';

const FullAPI = import('./FullAPI');
const SimpleAPI = import('./SimpleAPI');

type CoordsType = {
  lat: number;
  lon: number;
};

export type ControlsType = {
  hasDefault?: boolean;
  compass?: SMapCompassOptionsType;
  mouse?: ('pan' | 'wheel' | 'zoom' | 'zoom-in' | 'zoom-out')[];
  keyboard?: ('pan' | 'zoom')[];
};

export type MarkerType = {
  center: CoordsType;
  name: string;
  options?: SMapMarkerOptionsType;
};

export type MapConfig = {
  center?: CoordsType;
  zoom?: number;
  defaultLayer?: SMapLayerTypeType;
  sync?: {
    isEnabled?: boolean;
    bottom?: number;
  };
  controls?: ControlsType;
  markers?: MarkerType[];
  apiConfig?: ApiConfigType;
};

class Api {
  private static processSimpleAPI = async (map: SMapMapType, config: Pick<MapConfig, 'markers'>) => {
    if (ApiLoader.loadedApiVariant === 'full') {
      console.info(
        'Map should be loaded with Simple API but Full API is already loaded so map now uses Full API.'
      );

      return null;
    }

    const { default: SimpleAPIInstance } = await SimpleAPI;

    return new SimpleAPIInstance(map, config);
  };

  private static processFullAPI = async (
    map: SMapMapType,
    config: Pick<MapConfig, 'defaultLayer' | 'sync' | 'controls' | 'markers'>
  ) => {
    const { default: FullAPIInstance } = await FullAPI;

    return new FullAPIInstance(map, config);
  };

  public static async loadMapIntoContainer(
    container: HTMLDivElement,
    { apiConfig, ...config }: MapConfig = {}
  ) {
    await ApiLoader.init({ api: 'full', ...apiConfig });

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

    const map = Api.createMap(container, createCoords(center), zoom);
    const result = { map, Smap: window.SMap, JAK: window.JAK };

    if (apiConfig?.api === 'simple') {
      const api = await Api.processSimpleAPI(map, { markers });

      if (api !== null) {
        return { ...result, api };
      }
    }

    const api = await Api.processFullAPI(map, { defaultLayer, sync, controls, markers });

    return { ...result, api };
  }
  private static createMap(container: HTMLDivElement, center: SMapCoordsType, zoom: number) {
    return new window.SMap(window.JAK.gel(container), center, zoom);
  }
}

export default Api;
