import { useEffect, useState } from "react";
import ActivityMap from "./ActivityMap";
import { ElevationPlot } from "./ElevationChart";

export default function GpxUploader() {
  const [gpxFile, setGpxFile] = useState(null);
  const [rideComment, setRideComment] = useState("");

  const [centerLatitude, setCenterLatitude] = useState("");
  const [centerLongitude, setCenterLongitude] = useState("");
  const [coordinates, setCoordinates] = useState([""]);
  const [elevation, setElevation] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "/map.json";
    fetch(url)
      .then((response) => response.json())
      .then((respData) => {
        if (respData !== null) {
          setCenterLatitude(respData.latestActivity.latitude);
          setCenterLongitude(respData.latestActivity.longitude);
          setCoordinates(respData.latestActivity.coordinates);
          setElevation(respData.elevation.elevation);
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
        console.log(data);
        console.log("SUBMITTING!");
        if (data !== null) {
          setCenterLatitude(data.latestActivity.latitude);
          setCenterLongitude(data.latestActivity.longitude);
          setCoordinates(data.latestActivity.coordinates);
          setElevation(data.elevation.elevation);
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
    <div className="userGpxForm">
      <form>
        <h2 className="uploadHeading">Upload a new ride</h2>
        <label htmlFor="uploadFile" className="uploadFile">
          <input
            onChange={handleGpxFile}
            id="uploadFile"
            type="file"
            name="uploadFile"
            accept=".gpx"
            required
          />
        </label>
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
          className="rideCaption"
        />
        <br />
        <button
          disabled={rideComment === ""}
          onClick={handleClick}
          className="submitGpx"
        >
          Submit
        </button>
      </form>
      {!loading && (
        <>
          <h3>Latest Ride</h3>
          <ActivityMap
            centerLatitude={centerLatitude}
            centerLongitude={centerLongitude}
            coordinates={coordinates}
            className="userMap"
          />
          {elevation.length > 0 && <ElevationPlot elevation={elevation} />}
        </>
      )}
    </div>
  );
}
