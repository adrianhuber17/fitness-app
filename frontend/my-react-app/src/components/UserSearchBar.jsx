import { useEffect, useState } from "react";

export default function UserSearchBar(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let url = "/get-user-json";
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setUsers(responseData);
        setLoading(false);
      });
  }, []);
  console.log(users);
  return (
    loading === false && (
      <div>
        <h2>User search</h2>
        <input
          id="searchbar"
          type="text"
          name="search"
          placeholder="Search user.."
        />
        <ul className="search"></ul>
      </div>
    )
  );
}
