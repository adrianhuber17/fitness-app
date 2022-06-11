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
  const [totalTime, setTotalTime] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [elevationGainLoss, setElevationGainLoss] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [rideCaption, setRideCaption] = useState("");

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
          setTotalTime(respData.latestActivity.totalTime);
          setTotalDistance(respData.latestActivity.totalDistance);
          setElevationGainLoss(respData.elevationGainLossJson);
          setRideDate(respData.rideDate);
          setRideCaption(respData.rideCaption);

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
        console.log("SUBMITTING!");
        if (data !== null) {
          setCenterLatitude(data.latestActivity.latitude);
          setCenterLongitude(data.latestActivity.longitude);
          setCoordinates(data.latestActivity.coordinates);
          setTotalTime(data.latestActivity.totalTime);
          setTotalDistance(data.latestActivity.totalDistance);
          setElevation(data.elevation.elevation);
          setElevationGainLoss(data.elevationGainLossJson);
          setRideDate(data.rideDate);
          setRideCaption(data.rideCaption);
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
          <p className="cardCaption">{rideCaption}</p>
          <p className="cardDate">
            {rideDate.slice(0, -12)} at {rideDate.slice(17, 22)}
          </p>
          <div className="cardAllStats">
            <div className="cardStat">
              <p className="cardElevation">Elev Gain</p>
              <p className="cardElevationData">
                {elevationGainLoss ? (
                  <>{`${elevationGainLoss.elevation_gain_feet} ft`}</>
                ) : (
                  <>n/a</>
                )}
              </p>
            </div>
            <div className="cardStat">
              <p className="cardElevation">Distance</p>
              <p className="cardElevationData">
                {totalDistance ? <>{`${totalDistance.mi} mi`}</> : <>n/a</>}
              </p>
            </div>
            <div className="cardStat">
              <p className="cardElevation">Time</p>
              <p className="cardElevationData">
                {totalTime
                  ? `${totalTime.slice(0, 2)} h ${totalTime.slice(3, 5)} m `
                  : "n/a"}
              </p>
            </div>
          </div>

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
