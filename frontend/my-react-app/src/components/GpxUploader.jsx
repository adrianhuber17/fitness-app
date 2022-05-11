import { useEffect, useState } from "react";
import ActivityMap from "./ActivityMap";

export default function GpxUploader() {
  const [gpxFile, setGpxFile] = useState(null);
  const [rideComment, setRideComment] = useState("");

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
          setLoading(false);
        }
      });
  }, []);

  const handleGpxFile = (event) => {
    setGpxFile(event.target.files[0]);
  };

  const handleComment = (event) => {
    setRideComment(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", gpxFile);
    formData.append("ride-caption", rideComment);
    document.getElementById("uploadFile").value = "";
    setGpxFile(null);
    setRideComment("");

    fetch("/post-gpx-parser", {
      method: "POST",
      body: formData,
      hearders: { "Content-Type": "multipart/form-data" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("SUBMITTING!");
        if (data !== null) {
          setCenterLatitude(data.latestActivity.latitude);
          setCenterLongitude(data.latestActivity.longitude);
          setCoordinates(data.latestActivity.coordinates);
          setLoading(false);
        } else {
          setCenterLatitude("37.773972");
          setCenterLongitude("-122.431297");
          setCoordinates(["37.773972", "-122.431297"]);
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <form>
        <h2>Upload a new ride</h2>
        <input
          onChange={handleGpxFile}
          id="uploadFile"
          className="uploadFile"
          type="file"
          name="uploadFile"
          accept=".gpx"
          required
        />
        <br />
        <label htmlFor="ridecap">Ride Caption:</label>
        <input
          onChange={handleComment}
          required
          id="ridecap"
          type="text"
          name="ride-caption"
          placeholder="Enter activity caption.."
          value={rideComment}
        />
        <br />
        <button disabled={rideComment === ""} onClick={handleClick}>
          Submit
        </button>
      </form>
      {!loading && (
        <ActivityMap
          centerLatitude={centerLatitude}
          centerLongitude={centerLongitude}
          coordinates={coordinates}
        />
      )}
    </div>
  );
}
