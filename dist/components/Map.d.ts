import { FunctionComponent, HTMLAttributes } from 'react';
import { MapConfig } from '../services/Api';
interface MapProps extends HTMLAttributes<HTMLDivElement>, MapConfig {
}
declare const Map: FunctionComponent<MapProps>;
export default Map;
