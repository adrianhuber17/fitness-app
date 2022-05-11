import { useEffect, useState } from "react";

export default function UserSearchBar() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    let url = "/get-user-json";
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setUsers(responseData);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchUser(event.target.value.toLowerCase());
  };
  // console.log(users);
  return (
    loading === false && (
      <div>
        <input
          className="searchBar"
          id="searchbar"
          type="text"
          placeholder="Search user.."
          name="search"
          onChange={handleSearch}
        />
        {searchUser.length !== 0 && (
          <ul className="searchResults">
            {users
              .filter((user) => {
                if (
                  searchUser === "" ||
                  user.fullName.toLowerCase().includes(searchUser)
                ) {
                  return user;
                }
                return null;
              })
              .map((user) => (
                <p key={user.userId}>
                  <a href={`/other-user-profile?userId=${user.userId}`}>
                    {user.fullName}
                  </a>
                </p>
              ))}
          </ul>
        )}
      </div>
    )
  );
}
