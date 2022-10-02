import UserProfileTable from "../components/UserProfileTable";
import UserFollowingTable from "../components/UserFollowingTable";
import { useEffect, useState } from "react";
import UserFollowerTable from "../components/UserFollowerTable";
import { Plot } from "../components/Plot";

const UserProfile = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  const [userProfileInfo, setUserProfileInfo] = useState([]);
  const [totalElevationGain, setTotalElevationGain] = useState({});
  const [totalActivites, setTotalActivities] = useState({});

  useEffect(() => {
    if (session) {
      fetch(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/user-data.json`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((responseData) => {
          setUserFollowing(responseData.followingData);
          setUserFollower(responseData.followerData);
          setUserProfileInfo(responseData.userData);
          setTotalElevationGain(responseData.totalElevationGain);
          setTotalActivities(responseData.totalActivites);
          setLoading(false);
        });
    }
  }, [session]);

  return (
    <>
      {!loading && (
        <div className="user-profile-page component-shadow">
          <h1>Hey {userProfileInfo.first_name}!</h1>
          <UserProfileTable profileInfo={userProfileInfo} />
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
        </div>
      )}
    </>
  );
};
export default UserProfile;
