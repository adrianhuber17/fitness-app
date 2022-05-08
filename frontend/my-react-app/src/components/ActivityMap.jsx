import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ActivityMap() {
  const [centerLatitude, setCenterLatitude] = useState("");
  const [centerLongitude, setCenterLongitude] = useState("");
  const [coordinates, setCoordinates] = useState([""]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let url = "/map.json";
    fetch(url)
      .then((response) => response.json())
      .then((respData) => {
        if (respData !== null) {
          setCenterLatitude(respData.latitude);
          setCenterLongitude(respData.longitude);
          setCoordinates(respData.coordinates);
          setLoading(false);
        } else {
          setCenterLatitude("37.773972");
          setCenterLongitude("-122.431297");
          setCoordinates(["37.773972", "-122.431297"]);
        }
      });
  }, []);
  return (
    loading === false && (
      <MapContainer
        className="map"
        center={[centerLatitude, centerLongitude]}
        crs={L.CRS.EPSG3857}
        zoom={10}
        scrollWheelZoom={true}
        preferCanvas={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={coordinates} color={"red"} />
      </MapContainer>
    )
  );
}
