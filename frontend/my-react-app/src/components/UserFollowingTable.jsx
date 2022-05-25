export default function UserFollowingTable(props) {
  if (props.followingList.length !== 0) {
    return (
      <div className="follower-table">
        <h2>Following {props.followingList.length} users:</h2>
        <table id="following-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {props.followingList.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <a href={`/other-user-profile?userId=${user.userId}`}>
                    {user.firstName} profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <h2>Not following any user</h2>;
  }
}
