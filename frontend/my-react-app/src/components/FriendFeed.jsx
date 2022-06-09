import { useState } from "react";
import ActivityMap from "./ActivityMap";

export default function FriendFeed(props) {
  const [changeElevation, setChangeElevation] = useState(true);
  // const [totalTime, setTotalTime] = useState(null);

  const handleElevationChangeMeters = (event) => {
    if (changeElevation === true) {
      setChangeElevation(false);
    } else {
      setChangeElevation(true);
    }
  };
  return (
    <div className="friendsFeed component-shadow">
      <div
        className="top-right-corner-button"
        onClick={handleElevationChangeMeters}
      >
        <h3> 📐 Units: {changeElevation ? "Imperial" : "Metric"}</h3>
      </div>
      <h1>Friends Feed</h1>
      {props.friendsData.map((activity, ind) => (
        <div key={ind} className="friendCard">
          <div className="friendCardHeading">
            <div className="avatarCardName">
              <div className="avatar">
                {activity.firstName[0]}
                {activity.lastName[0]}
              </div>
              <div>
                <h2 className="cardName">{`${activity.firstName} ${activity.lastName}`}</h2>
                <p className="cardDate">{activity.date}</p>
              </div>
            </div>
            <div className="cardSubheading">
              <p className="cardCaption">{activity.rideCaption}</p>
              <div className="cardData">
                <div className="cardDatum">
                  <p className="cardElevation">Elev Gain</p>
                  <p className="cardElevationData">
                    {changeElevation ? (
                      <>{`${activity.elevationGainLossJson.elevation_gain_feet} ft`}</>
                    ) : (
                      <>{`${activity.elevationGainLossJson.elevation_gain_meters} m`}</>
                    )}
                  </p>
                </div>
                <div className="cardDatum">
                  <p className="cardElevation">Distance</p>
                  <p className="cardElevationData">
                    {changeElevation ? (
                      <>{`${activity.elevationGainLossJson.elevation_gain_feet} mi`}</>
                    ) : (
                      <>{`${activity.elevationGainLossJson.elevation_gain_meters} km`}</>
                    )}
                  </p>
                </div>
                <div className="cardDatum">
                  <p className="cardElevation">Time</p>
                  <p className="cardElevationData">
                    {activity.activityJson.totalTime
                      ? `${activity.activityJson.totalTime.slice(
                          0,
                          2
                        )} h ${activity.activityJson.totalTime.slice(3, 5)} m `
                      : "n/a"}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
