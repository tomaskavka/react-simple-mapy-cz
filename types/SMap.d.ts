export {};

declare global {
  // Layers
  type SMapLayerTypeType =
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

  type SMapLayerType = {
    enable: () => void;
    addMarker: (marker: SMapMarkerType) => void;
  };

  type SMapMarkerLayerOptionsType = {
    prefetch?: number;
    supportsAnimation?: boolean;
    poiTooltip?: boolean;
  }

  interface SMapMarkerLayerType {
    new (options?: SMapMarkerLayerOptionsType): SMapLayerType;
  }

  // Coords
  type SMapCoordsType = { x: number; y: number };

  // Controls
  type SMapCompassOptionsType = {
    panAmount?: number;
    title?: string;
    moveThreshold?: number;
  };

  interface SMapCompassType {
    new (options?: SMapCompassOptionsType);
  }

  type SMapMouseOptionsType = {
    scrollDelay?: number;
    idleDelay?: number;
    minDriftSpeed?: number;
    maxDriftSpeed?: number;
    driftSlowdown?: number;
    driftThreshold?: number;
  };

  interface SMapMouseType {
    new (mode: number, options?: SMapMouseOptionsType);
  }

  type SMapKeyboardOptionsType = {
    panAmount?: number;
    focusedOnly?: boolean;
  };

  interface SMapKeyboardType {
    new (mode: number, options?: SMapKeyboardOptionsType);
  }

  type SMapSyncOptionsType = {
    bottomSpace?: number | null;
    resieTimeout?: number;
  };

  interface SMapSyncType {
    new (options?: SMapSyncOptionsType);
  }

  // Marker
  type SMapMarkerOptionsType = {
    title?: string;
    size?: number[] | null;
    url?: HTMLElement | 'string',
    anchor?: { left?: number, top?: number, right?: number, bottom?: number };
  };

  interface SMapMarkerType {
    new (coords: SMapCoordsType, id?: string, options?: SMapMarkerOptionsType);
  }

  // Map
  type SMapMapType = {
    addMarker(coords: SMapCoordsType): void;
    addDefaultLayer(layer: number): SMapLayerType;
    addDefaultControls(): void;
    addControl(control: SMapCompassType): void;
    addLayer(layer: SMapLayerType, before?: boolean): SMapLayerType;
  };

  interface SMapType {
    new (container: HTMLElement, center: SMapCoordsType, zoom: number): SMapMapType;
    Control: {
      Compass: SMapCompassType;
      Mouse: SMapMouseType;
      Keyboard: SMapKeyboardType;
      Sync: SMapSyncType;
    };
    Coords: {
      fromWGS84: (lon: number, lat: number) => SMapCoordsType;
    };
    Layer: {
      Marker: SMapMarkerLayerType;
    };
    Marker: SMapMarkerType;
    DEF_BASE: number;
    DEF_TURIST: number;
    DEF_OPHOTO: number;
    DEF_HYBRID: number;
    DEF_HISTORIC: number;
    DEF_OPHOTO0203: number;
    DEF_OPHOTO0406: number;
    DEF_OBLIQUE: number;
    DEF_SMART_BASE: number;
    DEF_SMART_OPHOTO: number;
    DEF_SMART_TURIST: number;
    DEF_RELIEF: number;
    DEF_PANO: number;
    DEF_TURIST_WINTER: number;
    DEF_SMART_WINTER: number;
    DEF_SMART_SUMMER: number;
    DEF_GEOGRAPHY: number;
    DEF_OPHOTO1012: number;
    DEF_HYBRID_SPARSE: number;
    DEF_OPHOTO1415: number;
    DEF_OPHOTO1618: number;
    MOUSE_PAN: number;
    MOUSE_WHEEL: number;
    MOUSE_ZOOM: number;
    MOUSE_ZOOM_IN: number;
    MOUSE_ZOOM_OUT: number;
    KB_PAN: number;
    KB_ZOOM: number;
  }
}
