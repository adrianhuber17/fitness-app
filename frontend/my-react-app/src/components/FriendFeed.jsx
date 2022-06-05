import { useEffect, useState } from "react";
import ActivityMap from "./ActivityMap";
import { io } from "socket.io-client";

export default function FriendFeed(props) {
  const [changeElevation, setChangeElevation] = useState(true);
  const [socketInstance, setSocketInstance] = useState("");

  useEffect(() => {
    const socket = io("localhost:5001/", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000/",
      },
    });
    setSocketInstance(socket);

    socket.on("connect", (data) => {
      console.log(data);
    });
    socket.on("disconnect", (data) => {
      console.log(data);
    });
    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  const handleElevationChangeMeters = (event) => {
    if (changeElevation === true) {
      setChangeElevation(false);
    } else {
      setChangeElevation(true);
    }
  };
  console.log(socketInstance);

  return (
    <>
      <h1>Friends Feed</h1>
      <button onClick={handleElevationChangeMeters}>Change Units</button>
      {props.friendsData.map((activity, ind) => (
        <div key={ind}>
          <h2>{`${activity.firstName} ${activity.lastName}`}</h2>
          <p>{activity.date}</p>
          <p>{activity.rideCaption}</p>
          {changeElevation ? (
            <>
              <p>
                {`Elevation gain: ${activity.elevationGainLossJson.elevation_gain_feet} feet`}
              </p>
            </>
          ) : (
            <>
              <p>{`Elevation gain: ${activity.elevationGainLossJson.elevation_gain_meters} meters`}</p>
            </>
          )}

          <ActivityMap
            centerLatitude={activity.activityJson.latitude}
            centerLongitude={activity.activityJson.longitude}
            coordinates={activity.activityJson.coordinates}
            className="userMap"
          />
        </div>
      ))}
    </>
  );
}
