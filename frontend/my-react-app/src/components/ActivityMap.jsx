import L from "leaflet";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ChangeMapView({ coordsCenter, coords }) {
  const map = useMap();

  const polyBounds = L.polyline(coords).getBounds();

  const zoomeLevel = map.getBoundsZoom(polyBounds);

  map.setView(coordsCenter, zoomeLevel);
  return null;
}

export default function ActivityMap(props) {
  return (
    <>
      <MapContainer
        className="map"
        center={[props.centerLatitude, props.centerLongitude]}
        crs={L.CRS.EPSG3857}
        scrollWheelZoom={false}
        preferCanvas={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={[props.coordinates]} color={"red"} />
        <ChangeMapView
          coordsCenter={[props.centerLatitude, props.centerLongitude]}
          coords={[props.coordinates]}
        />
      </MapContainer>
    </>
  );
}
