import ActivityMap from "./ActivityMap";

export const ActivityCard = ({ activity, changeElevation, avatar }) => {
  return (
    <div className="activityCard friendCard bottom-shadow">
      <div className="avatarCardName">
        {avatar && (
          <div className="avatar">
            {activity.firstName[0]}
            {activity.lastName[0]}
          </div>
        )}
        <h2 className="cardName">
          <a
            href={`/other-user-profile?userId=${activity.userId}`}
          >{`${activity.firstName} ${activity.lastName}`}</a>
        </h2>
      </div>
      <div className="cardHeader">
        <p className="cardCaption">{activity.rideCaption}</p>
        <p className="cardDate">
          {activity.date.slice(0, -12)} at {activity.date.slice(17, 30)}
        </p>
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
                activity.activityJson.totalDistance ? (
                  <>{`${activity.activityJson.totalDistance.mi} mi`}</>
                ) : (
                  <>n/a</>
                )
              ) : activity.activityJson.totalDistance ? (
                <>{`${activity.activityJson.totalDistance.km} km`}</>
              ) : (
                <>n/a</>
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
      <ActivityMap
        centerLatitude={activity.activityJson.latitude}
        centerLongitude={activity.activityJson.longitude}
        coordinates={activity.activityJson.coordinates}
        className="userMap"
      />
    </div>
  );
};
