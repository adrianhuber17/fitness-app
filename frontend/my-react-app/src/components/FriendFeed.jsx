import { useState } from "react";
import { ActivityCard } from "./ActivityCard";

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
    <div className="sectionArea component-shadow">
      {props.newFeed > 0 && (
        <button className="updateButton" onClick={props.updateFeed}>
          new activity + {props.newFeed}
        </button>
      )}
      <div
        className="top-right-corner-button"
        onClick={handleElevationChangeMeters}
      >
        <h3> 📐 Units: {changeElevation ? "Imperial" : "Metric"}</h3>
      </div>
      <h1>Friends Feed</h1>
      {props.friendsData.map((activity, ind) => (
        <ActivityCard
          avatar={true}
          activity={activity}
          changeElevation={changeElevation}
          index={ind}
        />
      ))}
    </div>
  );
}
