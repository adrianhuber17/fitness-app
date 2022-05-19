// import { useEffect, useState } from "react";
import { useState } from "react";
import ActivityMap from "./ActivityMap";

export default function FriendFeed(props) {
  const [changeElevation, setChangeElevation] = useState(true);

  /**
   * useEffect
   * takes length of props.friendsData and initializes userElevationUnits dictionary
   * props.friendsData.forEach( add index: 'feet')
   */
  const userElevationUnits = {
    1: "feet",
    2: "feet",
    3: "feet",
  };

  const handleElevationChangeMeters = (event) => {
    setChangeElevation(false);
  };
  const handleElevationChangeFeet = (event) => {
    setChangeElevation(true);
  };

  return (
    <>
      <h1>Friends Feed</h1>
      {props.friendsData.map((activity, ind) => (
        <div key={ind}>
          <h2>{`${activity.firstName} ${activity.lastName}`}</h2>
          <p>{activity.date}</p>
          <p>{activity.rideCaption}</p>
          {userElevationUnits[ind] === "meters" ? (
            <>
              <p>
                {`Elevation gain: ${activity.elevationGainLossJson.elevation_gain_feet} feet`}
              </p>
              <button value={ind} onClick={handleElevationChangeMeters(ind)}>
                Change to meters
              </button>
            </>
          ) : (
            <>
              <p>{`Elevation gain: ${activity.elevationGainLossJson.elevation_gain_meters} meters`}</p>
              <button value={ind} onClick={handleElevationChangeFeet}>
                Change to feet
              </button>
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
