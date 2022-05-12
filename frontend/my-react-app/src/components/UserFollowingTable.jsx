export default function UserFollowingTable(props) {
  console.log(props.followingList);
  return (
    <div>
      <h2>Following:</h2>
      <table id="following-table">
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
            <td>list will go here, with HREF to go to user profile page</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
