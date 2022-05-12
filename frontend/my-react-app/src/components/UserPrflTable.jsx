import { useEffect, useState } from "react";
import UserFollowingTable from "./UserFollowingTable";

export default function UserPrflTable() {
  const [userFollowing, setUserFollowing] = useState({});
  const [userProfileInfo, setUserProfileInfo] = useState([]);

  useEffect(() => {
    fetch("/user-data.json")
      .then((response) => response.json())
      .then((responseData) => {
        setUserFollowing(responseData.followingData);
        setUserProfileInfo(responseData.userData);
      });
  }, []);

  return (
    <div>
      <h1>Hey {userProfileInfo.first_name}!</h1>
      <h2>Profile Information</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userProfileInfo.user_id}</td>
            <td>{userProfileInfo.first_name}</td>
            <td>{userProfileInfo.last_name}</td>
            <td>{userProfileInfo.email}</td>
          </tr>
        </tbody>
      </table>
      <UserFollowingTable followingList={userFollowing} />
    </div>
  );
}
