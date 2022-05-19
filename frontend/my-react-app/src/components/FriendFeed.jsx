// import { useEffect, useState } from "react";
import { useState } from "react";
import ActivityMap from "./ActivityMap";

export default function FriendFeed(props) {
  const [changeElevation, setChangeElevation] = useState(true);

  const handleElevationChangeMeters = (event) => {
    if (changeElevation === true) {
      setChangeElevation(false);
    } else {
      setChangeElevation(true);
    }
  };

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
