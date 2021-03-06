export default function UserFollowerTable(props) {
  if (props.followerList.length !== 0) {
    return (
      <div className="follower-table bottom-shadow">
        <h2>{props.followerList.length} followers:</h2>
        <table id="follower-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {props.followerList.map((user) => (
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
    return <h2>No followers</h2>;
  }
}
