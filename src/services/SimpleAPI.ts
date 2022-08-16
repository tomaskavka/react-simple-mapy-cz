import createCoords from '../utils/createCoords';
import type { MapConfig, MarkerType } from './Api';

class SimpleAPI {
  private map: SMapMapType;

  public type = 'simple';

  constructor(
    map: SMapMapType,
    { markers }: Pick<MapConfig, 'defaultLayer' | 'sync' | 'controls' | 'markers'>
  ) {
    this.map = map;

    if (markers) {
      this.addMarkers(markers);
    }
  }

  public addMarkers(markers: MarkerType[]) {
    markers.forEach(marker => this.addMarker(marker));
  }

  public addMarker({ center }: MarkerType) {
    this.map.addMarker(createCoords(center));
  }
}

export default SimpleAPI;
