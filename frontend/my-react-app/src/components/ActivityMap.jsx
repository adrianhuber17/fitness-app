import L from "leaflet";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

export default function ActivityMap(props) {
  return (
    <>
      <MapContainer
        className="map"
        center={[props.centerLatitude, props.centerLongitude]}
        crs={L.CRS.EPSG3857}
        zoom={12}
        scrollWheelZoom={true}
        preferCanvas={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={[props.coordinates]} color={"red"} />
        <ChangeMapView coords={[props.centerLatitude, props.centerLongitude]} />
      </MapContainer>
    </>
  );
}
