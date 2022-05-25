import { useEffect, useState } from "react";
// import searchIcon from "./svg/search_icon.svg";

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
      <div className="search">
        <div className="userSearch">
          <input
            className="searchBar"
            id="searchbar"
            type="text"
            placeholder="Search user.."
            name="search"
            onChange={handleSearch}
          />
          {/* <img className="searchIcon" src={searchIcon} alt="searchIcon" /> */}
        </div>
        <div className="searchResults">
          {searchUser.length !== 0 && (
            <>
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
                    <a
                      className="userSearchLinks"
                      href={`/other-user-profile?userId=${user.userId}`}
                    >
                      {user.fullName}
                    </a>
                  </p>
                ))}
            </>
          )}
        </div>
      </div>
    )
  );
}
