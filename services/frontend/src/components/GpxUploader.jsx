import { useEffect, useState, useContext } from "react";
import ActivityMap from "./ActivityMap";
import { ElevationPlot } from "./ElevationChart";
import { UnitContext } from "../helper/UnitsContext";

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

  const unitContext = useContext(UnitContext);
  const { changeElevation } = unitContext;

  useEffect(() => {
    console.log("/map.json");
    let url = `${process.env.REACT_APP_BACKEND_SERVICE_URL}/map.json`;
    fetch(url, { credentials: "include" })
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

    fetch(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/post-gpx-parser`, {
      method: "POST",
      body: formData,
      hearders: { "Content-Type": "multipart/form-data" },
      credentials: "include",
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
    <div className="sectionArea component-shadow">
      <div
        className="top-right-corner-button"
        onClick={() => setDisplayUpload(!displayUpload)}
      >
        <h3>{displayUpload ? "☁️" : "+"} Upload Ride</h3>
      </div>
      <>
        {displayUpload && (
          <form className="file-upload-wrapper">
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
      </>
      {!loading && (
        <>
          <h1>{rideCaption ? "My Latest Ride" : "Upload Your First Ride"}</h1>
          <div className="activityCard">
            <div className="cardHeader">
              <p className="cardCaption">{rideCaption && rideCaption}</p>
              {rideCaption && (
                <>
                  <p className="cardDate">
                    {rideDate.slice(0, -12)} {rideDate && "at"}{" "}
                    {rideDate.slice(17, 30)}
                  </p>
                  <div className="cardData">
                    <div className="cardDatum">
                      <p className="cardElevation">Elev Gain</p>
                      <p className="cardElevationData">
                        {elevationGainLoss ? (
                          changeElevation ? (
                            <>{`${elevationGainLoss.elevation_gain_feet} ft`}</>
                          ) : (
                            <>{`${elevationGainLoss.elevation_loss_meters} m`}</>
                          )
                        ) : (
                          "n/a"
                        )}
                      </p>
                    </div>
                    <div className="cardDatum">
                      <p className="cardElevation">Distance</p>
                      <p className="cardElevationData">
                        {totalDistance ? (
                          changeElevation ? (
                            <>{`${totalDistance.mi} mi`}</>
                          ) : (
                            <>{`${totalDistance.km} km`}</>
                          )
                        ) : (
                          "n/a"
                        )}
                      </p>
                    </div>
                    <div className="cardDatum">
                      <p className="cardElevation">Time</p>
                      <p className="cardElevationData">
                        {totalTime
                          ? `${totalTime.slice(0, 2)} h ${totalTime.slice(
                              3,
                              5
                            )} m `
                          : "n/a"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <ActivityMap
              centerLatitude={centerLatitude}
              centerLongitude={centerLongitude}
              coordinates={coordinates}
              className="userMap"
            />
            {elevation.length > 0 && <ElevationPlot elevation={elevation} />}
          </div>
        </>
      )}
    </div>
  );
}
