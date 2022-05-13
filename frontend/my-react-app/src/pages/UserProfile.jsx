import UserPrflTable from "../components/UserPrflTable";
import UserFollowingTable from "../components/UserFollowingTable";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userFollowing, setUserFollowing] = useState({});
  const [userProfileInfo, setUserProfileInfo] = useState([]);

  useEffect(() => {
    fetch("/user-data.json")
      .then((response) => response.json())
      .then((responseData) => {
        setUserFollowing(responseData.followingData);
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
        </>
      )}
    </div>
  );
};
export default UserProfile;
