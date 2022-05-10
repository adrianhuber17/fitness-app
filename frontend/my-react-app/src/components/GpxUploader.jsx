import { useEffect, useState } from "react";
import ActivityMap from "./ActivityMap";

export default function GpxUploader() {
  const [gpxFile, setGpxFile] = useState(null);
  const [rideComment, setRideComment] = useState("");

  const [centerLatitude, setCenterLatitude] = useState("");
  const [centerLongitude, setCenterLongitude] = useState("");
  const [coordinates, setCoordinates] = useState([""]);

  const [loading, setLoading] = useState(true);
  const [fetchedFlag, setFetchedFlag] = useState(true);

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
          setLoading(false); // ! setLoading will not be needed when this logic moves to onClick
        }
      });
    //TODO: remove fetchedFlag when /post-gpx-parser is updated
  }, [fetchedFlag]);

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
      //TODO: response should return respData as /map.json does
      method: "POST",
      body: formData,
      hearders: { "Content-Type": "multipart/form-data" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("SUBMITTING!");
        if (data.errors) {
          console.log(data.errors);
          setFetchedFlag((fetchedFlag) => !fetchedFlag);
        } else {
          console.log(".gpx file uploaded successfully");
          setFetchedFlag((fetchedFlag) => !fetchedFlag);
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
