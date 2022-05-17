import UserPrflTable from "../components/UserPrflTable";
import UserFollowingTable from "../components/UserFollowingTable";
import { useEffect, useState } from "react";
import UserFollowerTable from "../components/UserFollowerTable";
import { Plot } from "../components/Plot";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  const [userProfileInfo, setUserProfileInfo] = useState([]);
  const [totalElevationGain, setTotalElevationGain] = useState({});
  const [totalActivites, setTotalActivities] = useState({});

  useEffect(() => {
    fetch("/user-data.json")
      .then((response) => response.json())
      .then((responseData) => {
        setUserFollowing(responseData.followingData);
        setUserFollower(responseData.followerData);
        setUserProfileInfo(responseData.userData);
        setTotalElevationGain(responseData.totalElevationGain);
        setTotalActivities(responseData.totalActivites);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading && (
        <>
          <UserPrflTable profileInfo={userProfileInfo} />
          <UserFollowingTable followingList={userFollowing} />
          <UserFollowerTable followerList={userFollower} />
          {Object.keys(totalElevationGain).length !== 0 &&
            Object.keys(totalActivites).length !== 0 && (
              <div className="chart-container">
                <Plot
                  totalElevationGain={totalElevationGain}
                  totalActivites={totalActivites}
                />
              </div>
            )}
        </>
      )}
    </>
  );
};
export default UserProfile;
