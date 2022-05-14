import UserPrflTable from "../components/UserPrflTable";
import UserFollowingTable from "../components/UserFollowingTable";
import { useEffect, useState } from "react";
import UserFollowerTable from "../components/UserFollowerTable";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  const [userProfileInfo, setUserProfileInfo] = useState([]);

  useEffect(() => {
    fetch("/user-data.json")
      .then((response) => response.json())
      .then((responseData) => {
        setUserFollowing(responseData.followingData);
        setUserFollower(responseData.followerData);
        setUserProfileInfo(responseData.userData);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {!loading && (
        <>
          <UserPrflTable profileInfo={userProfileInfo} />
          <UserFollowingTable followingList={userFollowing} />
          <UserFollowerTable followerList={userFollower} />
        </>
      )}
    </div>
  );
};
export default UserProfile;
