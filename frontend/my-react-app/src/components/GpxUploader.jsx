import { useState } from "react";

export default function GpxUploader() {
  const [gpxFile, setGpxFile] = useState(null);
  const [rideComment, setRideComment] = useState("");

  const handleGpxFile = (event) => {
    setGpxFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const handleComment = (event) => {
    setRideComment(event.target.value);
    console.log(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", gpxFile);
    formData.append("ride-caption", rideComment);

    fetch("/post-gpx-parser", {
      method: "POST",
      body: formData,
      hearders: { "Content-Type": "multipart/form-data" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          alert(".gpx file uploaded successfully");
        }
      });
    setGpxFile(null);
    setRideComment("");
  };

  return (
    <div>
      <form>
        <h2>Upload a new ride</h2>
        <input
          onChange={handleGpxFile}
          className="file"
          type="file"
          name="uploadFile"
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
        />
        <br />
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}
