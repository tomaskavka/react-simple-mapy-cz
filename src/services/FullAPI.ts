import createCoords from '../utils/createCoords';
import type { ControlsType, MapConfig, MarkerType } from './Api';

class FullAPI {
  private map: SMapMapType;

  private markersLayers: Record<string, SMapLayerType> = {};

  public type = 'full';

  constructor(
    map: SMapMapType,
    {
      defaultLayer = 'BASE',
      sync = { isEnabled: false },
      controls,
      markers,
    }: Pick<MapConfig, 'defaultLayer' | 'sync' | 'controls' | 'markers'>
  ) {
    this.map = map;

    this.addLayer(defaultLayer).enable();

    if (sync.isEnabled) {
      this.addSync(sync.bottom);
    }

    if (controls) {
      this.addControls(controls);
    }

    if (markers) {
      this.addMarkers(markers);
    }
  }

  public addLayer(layer: SMapLayerTypeType) {
    return this.map.addDefaultLayer(window.SMap[`DEF_${layer}`]);
  }

  public addSync(bottomMargin?: number) {
    this.map.addControl(new window.SMap.Control.Sync({ bottomSpace: bottomMargin }));
  }

  public addControls({ hasDefault, compass, mouse, keyboard }: ControlsType) {
    if (hasDefault) {
      this.map.addDefaultControls();
    }

    if (compass) {
      this.map.addControl(new window.SMap.Control.Compass(compass));
    }

    if (mouse) {
      this.map.addControl(
        new window.SMap.Control.Mouse(
          (mouse.includes('pan') ? window.SMap.MOUSE_PAN : 0) +
            (mouse.includes('wheel') ? window.SMap.MOUSE_WHEEL : 0) +
            (mouse.includes('zoom') ? window.SMap.MOUSE_ZOOM : 0) +
            (mouse.includes('zoom-in') ? window.SMap.MOUSE_ZOOM_IN : 0) +
            (mouse.includes('zoom-out') ? window.SMap.MOUSE_ZOOM_OUT : 0)
        )
      );
    }

    if (keyboard) {
      this.map.addControl(
        new window.SMap.Control.Keyboard(
          (keyboard.includes('pan') ? window.SMap.KB_PAN : 0) +
            (keyboard.includes('zoom') ? window.SMap.KB_ZOOM : 0)
        )
      );
    }
  }

  private getMarkersLayer(layerName: string) {
    if (typeof this.markersLayers[layerName] === 'undefined') {
      const layer = new window.SMap.Layer.Marker();

      this.map.addLayer(layer);

      layer.enable();

      this.markersLayers[layerName] = layer;
    }

    return this.markersLayers[layerName];
  }

  public addMarkers(markers: MarkerType[], layerName = 'default') {
    const layer = this.getMarkersLayer(layerName);

    markers.forEach(props => this.addMarker(props, layerName, layer));
  }

  public addMarker(
    { center, name, options }: MarkerType,
    layerName = 'default',
    layer?: SMapLayerType
  ) {
    let markersLayer = layer;

    if (typeof markersLayer === 'undefined') {
      markersLayer = this.getMarkersLayer(layerName);
    }

    markersLayer.addMarker(new window.SMap.Marker(createCoords(center), name, options));
  }
}

export default FullAPI;
