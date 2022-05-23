export default function OtherUserTable(props) {
  return (
    <>
      <h1>Welcome to {props.userData.first_name} profile!</h1>
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
            <td>{props.userData.user_id}</td>
            <td>{props.userData.first_name}</td>
            <td>{props.userData.last_name}</td>
            <td>{props.userData.email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
