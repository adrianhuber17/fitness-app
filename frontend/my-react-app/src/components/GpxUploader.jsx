import { useEffect, useState } from "react";
import ActivityMap from "./ActivityMap";
import { ElevationPlot } from "./ElevationChart";

export default function GpxUploader({ socket, userData }) {
  const [gpxFile, setGpxFile] = useState(null);
  const [rideComment, setRideComment] = useState("");
  const [displayUpload, setDisplayUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

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
    setSelectedFile(event.target.files[0].name);
  };

  const handleComment = (event) => {
    setRideComment(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (socket) {
      console.log("socket gpx");
      socket.emit("new_data", userData.user_id);
    }
    let formData = new FormData();
    formData.append("file", gpxFile);
    formData.append("ride-caption", rideComment);
    document.getElementById("uploadFile").value = "";
    setGpxFile(null);
    setRideComment("");
    setSelectedFile("");

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
    setDisplayUpload(false);
  };

  return (
    <div className="userGpxForm component-shadow">
      <div
        className="top-right-corner-button"
        onClick={() => setDisplayUpload(!displayUpload)}
      >
        <h3>{displayUpload ? "☁️" : "+"} Upload Ride</h3>
      </div>
      <div className="file-upload-wrapper">
        {displayUpload && (
          <form>
            <div className="file-select">
              <input
                onChange={handleGpxFile}
                id="uploadFile"
                type="file"
                name="uploadFile"
                accept=".gpx"
                required
              />
              <label htmlFor="uploadFile" className="uploadFile">
                Select File
              </label>
              {selectedFile && (
                <>
                  <div>{selectedFile}</div>
                  <div
                    className="delete-file"
                    onClick={() => setSelectedFile("")}
                  >
                    x
                  </div>
                </>
              )}
            </div>
            <label htmlFor="ridecap" className="rideCaption-label">
              Ride Caption:
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
            </label>
            <button
              disabled={rideComment === "" || selectedFile === ""}
              onClick={handleClick}
              className="submitGpx"
            >
              Upload Ride
            </button>
          </form>
        )}
      </div>
      {!loading && (
        <>
          <h1>My Latest Ride</h1>
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
