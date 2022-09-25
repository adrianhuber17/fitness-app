export default function UserProfileTable(props) {
  return (
    <div className="user-profile-table bottom-shadow">
      <h2>Profile Information</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.profileInfo.user_id}</td>
            <td>{props.profileInfo.first_name}</td>
            <td>{props.profileInfo.last_name}</td>
            <td>{props.profileInfo.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
