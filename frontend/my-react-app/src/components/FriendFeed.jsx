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
    <div className="friendsFeed component-shadow">
      <h1>Friends Feed</h1>
      <button onClick={handleElevationChangeMeters}>Change Units</button>
      {props.friendsData.map((activity, ind) => (
        <div key={ind} className="friendCard">
          <div className="avatarCardName">
            <div className="avatarCard">
              {activity.firstName[0]}
              {activity.lastName[0]}
            </div>
            <h2 className="cardName">{`${activity.firstName} ${activity.lastName}`}</h2>
          </div>
          <p className="cardDate">{activity.date}</p>
          <p className="cardCaption">{activity.rideCaption}</p>
          {changeElevation ? (
            <>
              <p className="cardElecation">Elev Gain</p>
              <p className="cardElecationData">
                {`${activity.elevationGainLossJson.elevation_gain_feet} ft`}
              </p>
            </>
          ) : (
            <>
              <p className="cardElecation">Elev Gain</p>
              <p className="cardElecationData">
                {`${activity.elevationGainLossJson.elevation_gain_meters} m`}
              </p>
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
    </div>
  );
}
