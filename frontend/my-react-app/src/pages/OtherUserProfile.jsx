import { useEffect, useState } from "react";
import { GetOtherUserId } from "../helper/StateParamWrapper";
import ActivityMap from "../components/ActivityMap";
import OtherUserTable from "../components/OtherUserTable";
import FollowBtn from "../components/FollowBtn";
import { Plot } from "../components/Plot";

const OtherUser = () => {
  const [centerLatitude, setCenterLatitude] = useState("");
  const [centerLongitude, setCenterLongitude] = useState("");
  const [coordinates, setCoordinates] = useState([""]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState({});
  const [totalElevationGain, setTotalElevationGain] = useState({});
  const [totalActivites, setTotalActivities] = useState({});
  const [rideCaption, setRideCaption] = useState("");
  const [date, setDate] = useState("");
  const [elevationGain, setElevationGain] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = GetOtherUserId();

  useEffect(() => {
    const data = { userId: userId };
    fetch("/other-user.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((respData) => {
        if (respData.userLatestRide !== null) {
          setCenterLatitude(respData.userLatestRide.latitude);
          setCenterLongitude(respData.userLatestRide.longitude);
          setCoordinates(respData.userLatestRide.coordinates);
          setTotalElevationGain(respData.totalElevationGain);
          setTotalActivities(respData.totalActivities);
          setUserData(respData.userData);
          setRideCaption(respData.rideCaption);
          setDate(respData.date);
          setElevationGain(respData.elevationGainLossJson);
          setIsFollowing(respData.isFollowing);

          setLoading(false);
        } else {
          setCenterLatitude("37.773972");
          setCenterLongitude("-122.431297");
          setCoordinates(["37.773972", "-122.431297"]);
          setUserData(respData.userData);
          setIsFollowing(respData.isFollowing);
          setLoading(false);
        }
      });
  }, [userId]);

  const handleFollowClick = (event) => {
    const follow = event.target.value;
    const data = { userId: userId, follow: follow };
    fetch("/follow-user.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setIsFollowing(true);
      });
  };

  const handleUnfollowClick = (event) => {
    const unfollow = event.target.value;
    const data = { userId: userId, unfollow: unfollow };
    fetch("/unfollow-user.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("handleUnfollowClick response:", response);
        setIsFollowing(false);
      });
  };

  return (
    <div>
      <OtherUserTable userData={userData} />
      {!loading && (
        <FollowBtn
          isFollowing={isFollowing}
          handleFollowClick={handleFollowClick}
          handleUnfollowClick={handleUnfollowClick}
        />
      )}
      {!loading && (
        <div className="map-friend">
          {date !== "" && (
            <span>
              <li>{rideCaption}</li>
              <li>{date}</li>
              <li>{elevationGain.elevation_gain_feet} feet climbed</li>
            </span>
          )}

          <ActivityMap
            centerLatitude={centerLatitude}
            centerLongitude={centerLongitude}
            coordinates={coordinates}
          />
        </div>
      )}
      {Object.keys(totalElevationGain).length !== 0 &&
        Object.keys(totalActivites).length !== 0 && (
          <div className="chart-container">
            <Plot
              totalElevationGain={totalElevationGain}
              totalActivites={totalActivites}
            />
          </div>
        )}
    </div>
  );
};
export default OtherUser;
