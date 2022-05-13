import { useEffect, useState } from "react";
import { GetOtherUserId } from "../helperFunction/StateParamWrapper";
import ActivityMap from "../components/ActivityMap";
import OtherUserTable from "../components/OtherUserTable";
import FollowBtn from "../components/FollowBtn";

const OtherUser = () => {
  const [centerLatitude, setCenterLatitude] = useState("");
  const [centerLongitude, setCenterLongitude] = useState("");
  const [coordinates, setCoordinates] = useState([""]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState({});
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
          setUserData(respData.userData);
          setIsFollowing(respData.isFollowing);
          console.log(respData.isFollowing);
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

  return (
    <div>
      <OtherUserTable userData={userData} />
      {!loading && <FollowBtn isFollowing={isFollowing} userId={userId} />}
      {!loading && (
        <ActivityMap
          centerLatitude={centerLatitude}
          centerLongitude={centerLongitude}
          coordinates={coordinates}
        />
      )}
    </div>
  );
};
export default OtherUser;
