const createCoords = ({ lat, lon }: { lat: number; lon: number }) => {
  return window.SMap.Coords.fromWGS84(lon, lat);
};

export default createCoords;
