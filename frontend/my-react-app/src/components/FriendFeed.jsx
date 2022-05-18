// import { useEffect, useState } from "react";
import ActivityMap from "./ActivityMap";

export default function FriendFeed(props) {
  return (
    <>
      <h1>Friends Feed</h1>
      {props.friendsData.map((activity, ind) => (
        <div key={ind}>
          <h2>{`${activity.firstName} ${activity.lastName}`}</h2>
          <p>{activity.date}</p>
          <p>{activity.rideCaption}</p>
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
