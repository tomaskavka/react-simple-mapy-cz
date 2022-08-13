import { ApiConfig } from './ApiLoader';
declare type CoordsType = {
    lat: number;
    lon: number;
};
declare type LayerType = 'BASE' | 'TURIST' | 'OPHOTO' | 'HYBRID' | 'HISTORIC' | 'OPHOTO0203' | 'OPHOTO0406' | 'OBLIQUE' | 'SMART_BASE' | 'SMART_OPHOTO' | 'SMART_TURIST' | 'RELIEF' | 'PANO' | 'TURIST_WINTER' | 'SMART_WINTER' | 'SMART_SUMMER' | 'GEOGRAPHY' | 'OPHOTO1012' | 'HYBRID_SPARSE' | 'OPHOTO1415' | 'OPHOTO1618';
declare type ControlsType = {
    hasDefault?: boolean;
    compass?: {
        title?: string;
        style?: Record<string, string | number>;
    };
    mouse?: ('pan' | 'wheel' | 'zoom' | 'zoom-in' | 'zoom-out')[];
    keyboard?: ('pan' | 'zoom')[];
};
declare type MarkerType = {
    center: CoordsType;
    name: string;
    options?: {
        prefetch?: number;
        supportsAnimation?: boolean;
        poiTooltip?: boolean;
    };
};
export declare type MapConfig = {
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
declare class Api {
    private static markersLayers;
    static loadMapIntoContainer(container: HTMLDivElement, { apiConfig, ...config }?: MapConfig): Promise<any>;
    private static logMixingAPIsError;
    private static createCoords;
    private static createMap;
    private static addLayer;
    private static addSync;
    private static addControls;
    private static getMarkersLayer;
    private static addMarkers;
    static addMarkerToLayer(map: any, { center, name, options }: MarkerType, layerName?: string): void;
}
export default Api;
