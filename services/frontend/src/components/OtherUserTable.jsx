import FollowBtn from "../components/FollowBtn";

export default function OtherUserTable(props) {
  return (
    <div className="user-profile-table bottom-shadow">
      <h2>Profile Information</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Follow/Unfollow</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.userData.user_id}</td>
            <td>{props.userData.first_name}</td>
            <td>{props.userData.last_name}</td>
            <td>{props.userData.email}</td>
            <td>
              <FollowBtn
                isFollowing={props.isFollowing}
                handleFollowClick={props.handleFollowClick}
                handleUnfollowClick={props.handleUnfollowClick}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
