import { useContext } from "react";
import { ActivityCard } from "./ActivityCard";
import { UnitContext } from "../helper/UnitsContext";

export default function FriendFeed(props) {
  const unitContext = useContext(UnitContext);
  const { changeElevation, setChangeElevation } = unitContext;

  const handleElevationChangeMeters = (event) => {
    if (changeElevation === true) {
      setChangeElevation(false);
      sessionStorage.setItem("unitFlag", JSON.stringify(false));
    } else {
      setChangeElevation(true);
      sessionStorage.setItem("unitFlag", JSON.stringify(true));
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
          key={ind}
        />
      ))}
    </div>
  );
}
